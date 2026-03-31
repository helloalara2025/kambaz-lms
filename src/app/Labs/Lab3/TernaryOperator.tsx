export default function TernaryOperator() {
    const LoggedIn = true;
    return (
        <div id="wd-ternary-operator">
            <h4>Logged In </h4>
            {LoggedIn ? <p>Welcome!</p> : <p>Please login</p>} <hr />
        </div>
    );
}