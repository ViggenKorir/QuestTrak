import React from "react";
import "/src/App.css";

const LandingPage = ({
    heroText,
    oneLiner,
    landingPageText,
    featuresData,
    bannerTitle,
    bannerText
}) => {
    return (
        <>
            <section id="sect1">

                <h1>Welcome to QuestTrak</h1>
                <div className="home">
                    {/* <h1 id="hero-text">{heroText}</h1> */}
                    <h2 id="one-liner">Streamlining Our Children’s Ministry at Nairobi Chapel Ngong Hills.</h2>
                    <h3 id="landing-page-text">{landingPageText}</h3>
                    <br />
                    <i>"Efficiently manage attendance, ensure safe check-ins and check-outs, and keep parents informed — all in one place."</i>
                </div>
                <div id="action_buttons">
                    <button type="button" className="landing-page-button" id="get-started-button">Get Started</button>
                    <button type="button" className="landing-page-button" id="learn-more-button">Learn More</button>
                </div>
            </section>

            <section id="sect2">
                <div className="section_two">
                    <h2>Empowering the Quest Ministry</h2>

                    <div className="service">
                        <img src="src/assets/quest.jpg" alt="Quest" />
                        <div className="service_text">
                            <p>QuestTrak is a digital solution designed specifically for the Quest Ministry at Nairobi Chapel Ngong Hills. Our goal is to enhance the safety and efficiency of our children’s ministry by providing tools for attendance tracking, check-ins, and parent communication.</p>
                        </div>
                    </div>

                    {/* <div className="service reverse">
                        <div className="service_text">
                            <h3>Access to Professional Help</h3>
                            <p>Our subscription model provides you with access to licensed therapists and counselors, offering personalized support tailored to your needs.</p>
                        </div>
                        <img src="src/assets/Images/still-life-yoga-equipment_23-2151725310.jpg" alt="Professional Help" />
                    </div>

                    <div className="service">
                        <img src="src/assets/Images/still-life-yoga-equipment_23-2151725310.jpg" alt="Resource Library" />
                        <div className="service_text">
                            <h3>Resource Library</h3>
                            <p>Explore a wealth of educational materials, self-help tools, and wellness resources designed to empower your mental health journey.</p>
                        </div>
                    </div> */}

                    <div className="service reverse">
                        <img src="src/assets/ncngonghills quest.jpg" alt="Quest" />
                        <div className="service_text">
                            <h3>Our Mission</h3>
                            <p>With QuestTrak, we aim to provide a safe, secure, and organized environment for every child, ensuring they have the best experience in our care.</p>
                        </div>
                    </div>
                </div>
            </section>

            <footer>
                <p>&copy; 2024 All rights reserved</p>
                <p>Terms of Service</p>
                <p>Privacy</p>
            </footer>
        </>
    );
}

export default LandingPage;
