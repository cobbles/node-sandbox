import * as React from "react"

interface IProps {
    name?: string
}

export const App = (props: IProps): JSX.Element => {
    const urlParams = new URLSearchParams(window.location.search);
    const name = urlParams.get('name') ?? props.name;
    let text = '';
    if (name && name.length >= 5) {
        text = ` ${name} is a long name`
    }
    if (name && name.length < 5) {
        text = ` ${name} is a short name`
    }
    return <h1>{'Hello!' + text}</h1>
}