import Head from 'next/head';

export default function Top({name}) {
    return (
        <Head>
            <title>FTC Scouting | {name}</title>
            <meta name="description" content="FTC Scouting is a website where FIRST Tech Challenge teams can easily scout pre-match and during matches. This tool was developed by High Definition."/>
            <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1" />

            <link rel="preconnect" href="https://fonts.gstatic.com" />
            <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@100;400;500&display=swap" rel="stylesheet"/>
            <link href="https://fonts.googleapis.com/css2?family=Roboto+Condensed:wght@300;400&display=swap" rel="stylesheet"/>
            <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@100&display=swap" rel="stylesheet"/>
            <link href="https://fonts.googleapis.com/css2?family=Open+Sans&display=swap" rel="stylesheet"/>
            <link href="https://fonts.googleapis.com/css2?family=Oswald:wght@300&display=swap" rel="stylesheet"/>

            <link rel="icon" href="/static/logotrans.png" />    
        </Head>
    );
}