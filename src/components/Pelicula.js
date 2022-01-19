export function Pelicula(props) {
    return (
        <div>
            <div>
                <div>
                    <img src={props} />
                </div>
                <div>
                    <p>
                        {props}
                    </p>
                </div>
            </div>
            <div>
            </div>
        </div>
    )
}
