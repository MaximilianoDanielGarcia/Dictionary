import { useState, useEffect, useRef } from 'react';
import './Word.css';
import { Loader } from './Loader';
import { MeaningType } from './MeaningType';
import { NoResult } from './NoResult';

export function Word() {
    // State to store the fetched data
    const [data, setData] = useState(null);
    const [loading, setIsLoading] = useState(true);
    const [error, setError] = useState(false);
    const audioRef = useRef();
    const [refAquired, setRefAquired] = useState(false)

    window.addEventListener('local-storage', storageEventHandler, false);

    function storageEventHandler() {

        setIsLoading(true);
        getDataFromLocalStorage();
        setIsLoading(false);
       
    }

    // Effect to run when the component mounts
    useEffect(() => {
        setIsLoading(true);
        getDataFromLocalStorage();
        setIsLoading(false);
        setRefAquired(true);
    }, []);

    useEffect(() => {
        //Force re-render to set ref

    }, [refAquired]);

    const getDataFromLocalStorage = () => {
        // Check if data is already available in localStorage
        const responseOK = localStorage.getItem('response-ok');
        const responseData = localStorage.getItem('response-data');

        if (responseOK) {
            setData(JSON.parse(responseData));
            setError(false);

        } else {
            setError(true);
            setData(null);
        }
    }

    const handleClick = () => {
        audioRef.current.play();
    };

    const findSourceAudio = () => {

        if(data[0].phonetics.find(p => p.audio.indexOf('-us') !== -1)) {
           return data[0].phonetics.find(p => p.audio.indexOf('-us') !== -1).audio;
        }

        if(data[0].phonetics.find(p => p.audio.indexOf('-uk') !== -1)) {
            return data[0].phonetics.find(p => p.audio.indexOf('-uk') !== -1).audio;
         }

         if(data[0].phonetics.find(p => p.audio.indexOf('-au') !== -1)) {
            return data[0].phonetics.find(p => p.audio.indexOf('-au') !== -1).audio;
         }
    }

    return (
        <>
            {!loading && Array.isArray(data) ? (
                <section className='word-intro'>
                    <div className='word-and-phonetic'>
                        <h2>{data[0].word}</h2>
                        <p className='phonetic'>{data[0].phonetic ?? data[0].phonetics.find(p => p?.text)?.text}</p>
                    </div>
                    {data[0].phonetics.find(p => p.audio !== '')?.audio &&
                        <div>
                            <audio id='audio' src={findSourceAudio()} ref={audioRef}>
                            </audio>
                            <button className='play-button' onClick={handleClick}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="75" height="75" viewBox="0 0 75 75"><g fill="#A445ED" fillRule="evenodd"><circle cx="37.5" cy="37.5" r="37.5" opacity=".25" /><path d="M29 27v21l21-10.5z" /></g></svg>
                            </button>
                        </div>
                    }
                </section>
            ) :

                (!loading ? (
                    <NoResult />
                ) : <div className='loader-container'><Loader /></div>)
            }

            {!loading && Array.isArray(data) && (
                <section className='meanings-container'>
                    {data[0].meanings.map((meaning, index) =>
                        <MeaningType meaning={meaning} key={index}/>
                    )}

                    <div className='meanings-source'>
                        <h4>Source</h4>
                        <div>
                          <a href={data[0].sourceUrls[0]} target='_blank'>{data[0].sourceUrls[0]}</a>
                          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14"><path fill="none" stroke="#838383" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6.09 3.545H2.456A1.455 1.455 0 0 0 1 5v6.545A1.455 1.455 0 0 0 2.455 13H9a1.455 1.455 0 0 0 1.455-1.455V7.91m-5.091.727 7.272-7.272m0 0H9m3.636 0V5"/></svg>
                        </div>
                    </div>
                   
                </section>
            )}
        </>
    );
};
