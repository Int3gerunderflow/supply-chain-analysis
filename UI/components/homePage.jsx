import React from "react";
import Navbar from "./navbar";

import '../stylesheets/homestyle.css'

function HomePage()
{
    return(
        <>
        <main>
            <section className="heroSection">
                <h1>SEE RELATIONSHIPS <br></br>YOU'VE <u>NEVER</u> SEEN BEFORE</h1>
                <img src="../assets/SanalysisHeroBanner.png"></img>
            </section>
            <section className="firstInfoSection">
                <article>
                    <h2>Ever wonder how many companies are involved in making your favorite product?</h2>
                    <p>In today's globalized economy, companies can specialize and do what
they do best. When it comes time to finally build a product, that
specialization can be leveraged to create something no single
company could ever do. </p>
                </article>
                <div id="companyGrid">
                    <img src="../assets/Airbus-logo.png"></img>
                    <img src="../assets/Apple_logo_grey.png"></img>
                    <img src="../assets/Sony_logo.svg"></img>
                    <img src="../assets/coca-cola-logo.png"></img>
                    <img src="../assets/Samsung-Logo.png"></img>
                    <img src="../assets/honda-logo.png"></img>
                </div>
            </section>
            <section className="secondInfoSection">
                <img src="../assets/visualDemo.png"></img>
                <article>
                    <h2>See supply chains in a visual way</h2>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
                        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. </p>
                </article>
            </section>
            <section className="firstInfoSection">
                <article>
                    <h2>Easily share your visualizations</h2>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
                        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. </p>
                </article>
                <img src="../assets/high-five.png" id="highFive"></img>
            </section>
            <section className="endBanner">
                <article>
                    <h2>A <u>world</u> of possibilites <br></br>are at your fingertips</h2>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
                        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. </p>
                </article>
            </section>
        </main>
        <footer>
            <p>Copyright {new Date().getFullYear()}      Icons and artwork by: <a href="https://www.freepik.com">Freepik</a></p>
            </footer>
        </>
    )
}

export default HomePage