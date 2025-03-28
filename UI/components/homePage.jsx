import React from "react";
import Navbar from "./navbar";

import '../stylesheets/homestyle.css'

function HomePage()
{
    return(
        <main>
            <section className="heroSection">
                <h1>SEE RELATIONSHIPS <br></br>YOU'VE <u>NEVER</u> SEEN BEFORE</h1>
                <img src="../assets/SanalysisHeroBanner.png"></img>
            </section>
            <section className="firstInfoSection">
                <article>
                    <h2>Ever wonder how many companies are involved in making your favorite product?</h2>
                    <p>In today’s globalized economy, companies can specialize and do what
they do best. When it comes time to finally build a product, that
specialization can be leveraged to create something no single
company could ever do. </p>
                    <img></img>
                </article>
            </section>
        </main>
    )
}

export default HomePage