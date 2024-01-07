import './NoResult.css';

export function NoResult() {
    return (
        <section className='empty-section'>
            <img src="/assets/images/emoji.png" alt="" />
            <article>
                <h2>No Definitions Found</h2>
                <p>Sorry pal, we couldn't find definitions for the word you were looking for. You can try the search again at later time or head to the web instead.</p>
            </article>
        </section>
    )
}