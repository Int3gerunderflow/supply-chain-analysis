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
company could ever do. However, as product complexity grows so does supply chain complexity.
This website aims to provide an easy visual for any supply chain and to share new or
interesting insights into the backbone behind the products you know and love.</p>
                </article>
                <div id="companyGrid">
                    <img src="../assets/Airbus-logo.png"></img>
                    <img src="../assets/Apple_logo_grey.png"></img>
                    <img src="../assets/Sony_logo.svg"></img>
                    <img src="../assets/coca-cola-logo.png"></img>
                    <img src="../assets/Samsung-Logo.png"></img>
                    <img src="../assets/honda-logo.png"></img>
                    <img src="../assets/nike-swoosh-logo.png"></img>
                    <img src="../assets/amazon-logo.png"></img>
                </div>
            </section>
            <section className="secondInfoSection">
                <img src="../assets/visualDemo.png"></img>
                <article>
                    <h2>See supply chains in a visual way</h2>
                    <p>Leveraging the power of Deck.gl, this page provides beautiful visualizations of the world's top supply chains. 
                        See in one detailed map how everything connects together. Even better, get detailed descriptions and fun facts about every supplier when you click on them. 
                        Want to make your own visualizations? Create your own account and get started today!</p>
                </article>
            </section>
            <section className="firstInfoSection">
                <article>
                    <h2>Easily share your visualizations</h2>
                    <p>Effective supply chain management starts with clear insights.
                        That's why we've made it incredibly easy to share your visualizations with others.
                        Just make your post public at any time and anyone can see and gain insight from it.
                        Experience the full potential of supply chain visualization today. Explore our features and
start sharing insights that drive results!</p>
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