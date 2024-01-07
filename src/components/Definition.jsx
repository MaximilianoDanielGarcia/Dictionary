import './Definition.css';

export function Definition({ definition }) {
    
    return (
        <li className="definition-list-item">
            <div>
                <p className="definition">{definition.definition}</p>
                { definition.example && <p className="example">{`\"${definition.example}\"`}</p>}
            </div>
        </li>
    )
}