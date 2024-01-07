import { useEffect } from 'react';
import { Definition } from './Definition';
import './MeaningType.css';

export function MeaningType({ meaning }) {

    const searchWord = (word) => {
        fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
        .then((response) => response.json())
        .then((data) => {
           
            localStorage.setItem("response-data", JSON.stringify(data));
            localStorage.setItem('response-ok', true);
            
        }).catch((error) => {
            localStorage.setItem("response-data", JSON.stringify(error));
            localStorage.setItem('response-ok', false);
        }).finally(() => {
            window.dispatchEvent(new Event('local-storage'));
        });
    }

    return (
        <div className='meaning-type'>
            <div className='meaning-header'>
                <h3>{meaning.partOfSpeech}</h3>
                <span className='line-h'></span>
            </div>
            <div className='meaning-container'>
                <h4 className='meaning-subtitle'>Meaning</h4>
                <ul className='definition-list'>
                    { meaning.definitions.map((definition, index) => (
                        <Definition definition={definition} key={index}/>
                    ))}
                   
                </ul>
            </div>
            { meaning.synonyms.length > 0 && 
                <div className='meaning-container synonyms-antonyms'>
                    <h4 className='meaning-subtitle'>Synonyms</h4>

                    <div style={{width: '100%', display: 'flex', flexWrap: 'wrap', gap: '22px'}}>
                        { meaning.synonyms.map((synonym, index) => (
                            <p key={index} className='meaning-synonyms' onClick={() => searchWord(synonym)}>{synonym}</p>
                        ))}
                    </div>
                    
                </div>
            }
           { meaning.antonyms.length > 0 &&
                <div className='meaning-container synonyms-antonyms'>
                    <h4 className='meaning-subtitle'>Antonyms</h4>

                    <div style={{width: '100%', display: 'flex', flexWrap: 'wrap', gap: '22px'}}>
                        { meaning.antonyms.map((antonym, index) => (
                            <p key={index} className='meaning-antonyms' onClick={() => searchWord(antonym)}>{antonym}</p>
                        ))}
                    </div>
                    
                </div>
            }
           
        </div>
    )
}