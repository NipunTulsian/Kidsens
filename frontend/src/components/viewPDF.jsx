import React from 'react'
import land from "./landing.png"
import logo from "./logo.png"
import tick from "./tick.png"
import cross from "./cross.png"
import {
    Document,
    Page,
    Text,
    StyleSheet,
    PDFViewer,
    Image,
    Circle,
    Font,
    Svg,
} from "@react-pdf/renderer";

Font.register({
    family: "Roboto",
    fonts: [
        {
            src: "http://fonts.gstatic.com/s/roboto/v30/KFOmCnqEu92Fr1Me5WZLCzYlKw.ttf",
        },
        {
            src: "http://fonts.gstatic.com/s/roboto/v30/KFOlCnqEu92Fr1MmEU9vAx05IsDqlA.ttf",
            fontWeight: "bold",
        },
    ],
});

const styles = StyleSheet.create({
    section: {
        margin: 10,
        padding: 10,
    },
    title: {
        fontSize: 40,
        fontFamily: 'Roboto',
        fontWeight: "bold"
    },
    viewer: {
        width: window.innerWidth, //the pdf viewer will take up all of the width and height
        height: window.innerHeight,
    },
    pageNumber: {
        position: "absolute",
        fontSize: 12,
        bottom: 30,
        left: 0,
        right: 0,
        textAlign: "center",
        color: "grey",
    },
    text: {
        margin: 12,
        fontSize: 14,
        textAlign: "justify",
        fontFamily: "Times-Roman",
    },
    body: {
        fontFamily: "Roboto",
        backgroundColor: "#fff",
        color: "black",
        paddingTop: 35,
        paddingBottom: 35,
    },
});

export default function ViewPDF() {
    return (
        <PDFViewer style={styles.viewer}>
            <Document>
                <Page size="A4" style={styles.body}>
                    <div style={{ position: "absolute", top: "10px", right: "15px", width: "60%" }}>
                        <div style={{ display: "flex", flexDirection: "row", width: "100%", backgroundColor: "#ddd", height: "15px" }}>
                            <div style={{ width: "60%", backgroundColor: "#7f53ac", height: "100%" }}>
                            </div>
                            <div style={{ width: "40%", backgroundColor: "lightpink", height: "100%" }}>
                            </div>
                        </div>
                    </div>
                    <div style={{ position: "relative" }}>
                        <div style={{ display: "flex", alignItems: "center" }} >
                            <Image src={land} style={{ margin: "0px auto", width: "80%", height: "200px" }}></Image>
                        </div>
                        <div style={{ marginTop: "40px", paddingLeft: "60px" }}>
                            <Text style={{ fontSize: "15px", fontWeight: "bold", marginBottom: "15px" }}>
                                CHILD DEVELOPMENT (2-3 YEARS)
                            </Text>
                            <div style={{ width: "20px", height: "3px", backgroundColor: "rgb(0, 180, 219)", marginBottom: "5px" }}></div>
                            <div style={{ display: "flex", flexDirection: "row" }}>
                                <div style={{ width: "60%", paddingRight: "20px" }}>
                                    <Text style={{ fontSize: "12px", opacity: "0.6", marginBottom: "20px" }}>
                                        For a child to develop normally they must attain physical milestones like sitting and walking. They must acquire the expression and the comprehension of language. They must be able to retain old knowledge and use it as the foundation for new knowledge. They must learn to relate effectively to the people and the environment around them. It is rare to find a task that relies solely on one skill which is why fi one area is lagging or dysfunctional, the entire process of development is compromised. When these areas of cognition or function are delayed, a child may be said to be experiencing a developmental delay.
                                    </Text>
                                    <Text style={{ fontSize: "15px", fontWeight: "bold", marginBottom: "10px" }}>
                                        REPORT
                                    </Text>
                                    <div style={{ width: "20px", height: "3px", backgroundColor: "hotpink", marginBottom: "5px" }}></div>
                                    <Text style={{ fontSize: "12px", opacity: "0.8", marginBottom: "20px" }}>
                                        Following are  the criteria used to measure the child's development.
                                    </Text>
                                    <div style={{ display: "flex", flexDirection: "column" }}>
                                        <div style={{ display: "flex", flexDirection: "row", marginLeft: "20%", justifyContent: "space-between", marginBottom: "5px" }}>
                                            <Text style={{ fontSize: "10px", fontWeight: "bold" }}>
                                                DELAYED
                                            </Text>
                                            <Text style={{ fontSize: "10px", fontWeight: "bold" }}>
                                                ON-TRACK
                                            </Text>
                                            <Text style={{ fontSize: "10px", fontWeight: "bold" }}>
                                                ADVANCED
                                            </Text>
                                        </div>
                                        <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: "15px" }}>
                                            <Text style={{ color: "rgb(0, 180, 219)", fontSize: "10px", fontWeight: "bold" }}>
                                                SPEECH
                                            </Text>
                                            <div style={{ width: "80%", backgroundColor: "#ddd", height: "10px", borderRadius: "10px" }}>
                                                <div style={{ position: "relative", width: "85%", borderRadius: "10px", height: "100%", backgroundColor: "#7f53ac" }} />
                                            </div>
                                        </div>
                                        <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", marginBottom: "15px" }}>
                                            <Text style={{ color: "rgb(0, 180, 219)", fontSize: "10px", fontWeight: "bold" }}>
                                                MOTOR
                                            </Text>
                                            <div style={{ width: "80%", backgroundColor: "#ddd", height: "10px", borderRadius: "10px" }}>
                                                <div style={{ position: "relative", width: "85%", borderRadius: "10px", height: "100%", backgroundColor: "hotpink" }} />
                                            </div>
                                        </div>
                                        <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", marginBottom: "15px" }}>
                                            <Text style={{ color: "rgb(0, 180, 219)", fontSize: "10px", fontWeight: "bold" }}>
                                                SOCIAL
                                            </Text>
                                            <div style={{ width: "80%", backgroundColor: "#ddd", height: "10px", borderRadius: "10px" }}>
                                                <div style={{ position: "relative", width: "85%", borderRadius: "10px", height: "100%", backgroundColor: "lightpink" }} />
                                            </div>
                                        </div>
                                        <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", marginBottom: "15px" }}>
                                            <Text style={{ color: "rgb(0, 180, 219)", fontSize: "10px", fontWeight: "bold" }}>
                                                COGNITIVE
                                            </Text>
                                            <div style={{ width: "80%", backgroundColor: "#ddd", height: "10px", borderRadius: "10px" }}>
                                                <div style={{ position: "relative", width: "85%", borderRadius: "10px", height: "100%", backgroundColor: "#7f53ac" }} />
                                            </div>
                                        </div>
                                        <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", marginBottom: "15px" }}>
                                            <Text style={{ color: "rgb(0, 180, 219)", fontSize: "10px", fontWeight: "bold" }}>
                                                EMOTIONAL
                                            </Text>
                                            <div style={{ width: "80%", backgroundColor: "#ddd", height: "10px", borderRadius: "10px" }}>
                                                <div style={{ position: "relative", width: "85%", borderRadius: "10px", height: "100%", backgroundColor: "hotpink" }} />
                                            </div>
                                        </div>
                                        <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", marginBottom: "15px" }}>
                                            <Text style={{ color: "rgb(0, 180, 219)", fontSize: "10px", fontWeight: "bold" }}>
                                                SENSORY
                                            </Text>
                                            <div style={{ width: "80%", backgroundColor: "#ddd", height: "10px", borderRadius: "10px" }}>
                                                <div style={{ position: "relative", width: "85%", borderRadius: "10px", height: "100%", backgroundColor: "lightpink" }} />
                                            </div>
                                        </div>
                                        <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", marginBottom: "15px" }}>
                                            <Text style={{ color: "rgb(0, 180, 219)", fontSize: "10px", fontWeight: "bold" }}>
                                                BEHAVIOUR
                                            </Text>
                                            <div style={{ width: "80%", backgroundColor: "#ddd", height: "10px", borderRadius: "10px" }}>
                                                <div style={{ position: "relative", width: "85%", borderRadius: "10px", height: "100%", backgroundColor: "#7f53ac" }} />
                                            </div>
                                        </div>
                                    </div>

                                </div>
                                <div style={{ display: "flex", flexDirection: "column" }}>
                                    <div style={{ backgroundColor: "lightgrey", padding: "30px", display: "flex", flexDirection: "column", borderRadius: "10px", opacity: "0.7" }}>
                                        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: "8px" }}>
                                            <Text style={{ fontWeight: "bold" }}>
                                                Student's
                                            </Text>
                                            <Text style={{ color: "rgb(255, 20, 147)", fontWeight: "bold" }}>
                                                Information
                                            </Text>
                                        </div>
                                        <div style={{ display: "flex", flexDirection: "row", marginBottom: "8px" }}>
                                            <Text style={{ fontSize: "13px", fontWeight: "bold" }}>
                                                School :
                                            </Text>
                                            <Text style={{ color: "rgb(255, 20, 147)", fontSize: "13px", fontWeight: "bold" }}>
                                                JH Ambani
                                            </Text>
                                        </div>
                                        <div style={{ display: "flex", flexDirection: "row", marginBottom: "8px" }}>
                                            <Text style={{ fontSize: "13px", fontWeight: "bold" }}>
                                                Name :
                                            </Text>
                                            <Text style={{ color: "rgb(255, 20, 147)", fontSize: "13px", fontWeight: "bold" }}>
                                                Nipun Tulsian
                                            </Text>
                                        </div>
                                        <div style={{ display: "flex", flexDirection: "row", marginBottom: "8px" }}>
                                            <Text style={{ fontSize: "13px", fontWeight: "bold" }}>
                                                DOB :
                                            </Text>
                                            <Text style={{ color: "rgb(255, 20, 147)", fontSize: "13px", fontWeight: "bold" }}>
                                                13/06/2003
                                            </Text>
                                        </div>
                                        <div style={{ display: "flex", flexDirection: "row", marginBottom: "8px" }}>
                                            <Text style={{ fontSize: "13px", fontWeight: "bold" }}>
                                                Gender :
                                            </Text>
                                            <Text style={{ color: "rgb(255, 20, 147)", fontSize: "13px", fontWeight: "bold" }}>
                                                Male
                                            </Text>
                                        </div>
                                        <div style={{ display: "flex", flexDirection: "row", marginBottom: "8px" }}>
                                            <Text style={{ fontSize: "13px", fontWeight: "bold" }}>
                                                Roll No. :
                                            </Text>
                                            <Text style={{ color: "rgb(255, 20, 147)", fontSize: "13px", fontWeight: "bold" }}>
                                                16
                                            </Text>
                                        </div>
                                        <div style={{ display: "flex", flexDirection: "row", marginBottom: "8px" }}>
                                            <Text style={{ fontSize: "13px", fontWeight: "bold" }}>
                                                School:
                                            </Text>
                                            <Text style={{ color: "rgb(255, 20, 147)", fontSize: "13px", fontWeight: "bold" }}>
                                                JH Ambani
                                            </Text>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div >
                    <div style={{ position: "absolute", bottom: "20px", left: "15px", width: "60%" }}>
                        <div style={{ display: "flex", flexDirection: "row", width: "100%", backgroundColor: "#ddd", height: "15px" }}>
                            <div style={{ width: "40%", backgroundColor: "#7f53ac", height: "100%" }}>
                            </div>
                            <div style={{ width: "60%", backgroundColor: "lightpink", height: "100%" }}>
                            </div>
                        </div>
                    </div>
                    <div style={{ position: "absolute", bottom: "15px", right: "30px", display: "flex", flexDirection: "column" }}>
                        <div style={{ display: "flex", flexDirection: "row", justifyContent: "flex-end" }}>
                            <Text style={{ fontSize: "10px" }}>
                                Powered By
                            </Text>
                        </div>
                        <Image src={logo} style={{ width: "130px", height: "100px", marginTop: "-30px" }} />
                    </div>
                </Page>


                <Page size="A4" style={styles.body}>
                    <div style={{ position: "absolute", top: "10px", right: "15px", width: "60%" }}>
                        <div style={{ display: "flex", flexDirection: "row", width: "100%", backgroundColor: "#ddd", height: "15px" }}>
                            <div style={{ width: "60%", backgroundColor: "#7f53ac", height: "100%" }}>
                            </div>
                            <div style={{ width: "40%", backgroundColor: "lightpink", height: "100%" }}>
                            </div>
                        </div>
                    </div>
                    <div style={{ position: "absolute", bottom: "20px", left: "15px", width: "60%" }}>
                        <div style={{ display: "flex", flexDirection: "row", width: "100%", backgroundColor: "#ddd", height: "15px" }}>
                            <div style={{ width: "40%", backgroundColor: "#7f53ac", height: "100%" }}>
                            </div>
                            <div style={{ width: "60%", backgroundColor: "lightpink", height: "100%" }}>
                            </div>
                        </div>
                    </div>
                    <div style={{ position: "absolute", bottom: "15px", right: "30px", display: "flex", flexDirection: "column" }}>
                        <div style={{ display: "flex", flexDirection: "row", justifyContent: "flex-end" }}>
                            <Text style={{ fontSize: "10px" }}>
                                Powered By
                            </Text>
                        </div>
                        <Image src={logo} style={{ width: "130px", height: "100px", marginTop: "-30px" }} />
                    </div>
                    <div style={{ padding: "30px 40px", marginBottom: "20px" }}>
                        <Text style={styles.title}>SPEECH AND LANGUAGE</Text>
                        <Text style={styles.title}>DEVELOPMENT</Text>
                    </div>
                    <div style={{ marginLeft: "20%", marginRight: "20px", width: "78%" }}>
                        <div style={{ height: "2px", widht: "100%", backgroundColor: "black" }} />
                    </div>
                    <div style={{ marginTop: "30px", paddingLeft: "50px" }}>
                        <Text style={{ fontSize: "15px", fontWeight: "bold", marginBottom: "15px" }}>
                            SPEECH AND LANGUAGE DEVELOPMENT (2-3 YEARS)
                        </Text>
                        <div style={{ width: "20px", height: "3px", backgroundColor: "rgb(0, 180, 219)", marginBottom: "10px" }}></div>
                        <div style={{ display: "flex", flexDirection: "row" }}>
                            <div style={{ width: "60%", paddingRight: "20px" }}>
                                <Text style={{ fontSize: "12px", opacity: "0.6", marginBottom: "20px" }}>
                                    Learning language is a crucial task in their development and acquisition of language profoundly extends their horizons. Though the pace of language development varies considerably from child to child, a 3year would be able to form short sentences using 2-3 words together. He/she would be able to name the common objects in the surrounding. He/she would be able to make his/her needs known by using relevant words.
                                </Text>
                                <Text style={{ fontSize: "15px", fontWeight: "bold", marginBottom: "10px" }}>
                                    NIPUN'S REPORT
                                </Text>
                                <div style={{ width: "20px", height: "3px", backgroundColor: "hotpink", marginBottom: "10px" }}></div>
                                <Text style={{ fontSize: "12px", opacity: "0.6", marginBottom: "25px" }}>
                                    Following are the criteria used to measure the child's development.
                                </Text>
                                <div style={{ display: "flex", flexDirection: "column", paddingLeft: "10px" }}>
                                    <div style={{ display: "flex", flexDirection: "row", alignItems: "center", marginBottom: "10px" }}>
                                        <Image src={tick} style={{ width: "28px", height: "28px", marginRight: "10px" }} />
                                        <Text style={{ opacity: "0.6", fontSize: "12px" }}>Speak 15 different words in the right way</Text>
                                    </div>
                                    <div style={{ display: "flex", flexDirection: "row", alignItems: "center", marginBottom: "10px" }}>
                                        <Image src={tick} style={{ width: "28px", height: "28px", marginRight: "10px" }} />
                                        <Text style={{ opacity: "0.6", fontSize: "12px" }}>Speak 15 different words in the right way</Text>
                                    </div>
                                    <div style={{ display: "flex", flexDirection: "row", alignItems: "center", marginBottom: "10px" }}>
                                        <Image src={tick} style={{ width: "28px", height: "28px", marginRight: "10px" }} />
                                        <Text style={{ opacity: "0.6", fontSize: "12px" }}>Speak 15 different words in the right way</Text>
                                    </div>
                                    <div style={{ display: "flex", flexDirection: "row", alignItems: "center", marginBottom: "10px" }}>
                                        <Image src={cross} style={{ width: "28px", height: "28px", marginRight: "10px" }} />
                                        <Text style={{ opacity: "0.6", fontSize: "12px" }}>Speak 15 different words in the right way</Text>
                                    </div>
                                </div>
                            </div>
                            <div style={{ width: "30%", display: "flex", alignItems: "center", flexDirection: "column" }}>
                                <Text style={{ fontSize: "15px", fontWeight: "bold", marginBottom: "10px", color: "rgb(0, 180, 219)" }}>
                                    SCORE
                                </Text>
                                <Svg height="100" width="100">
                                    <Circle
                                        cx="50"
                                        cy="50"
                                        r="30"
                                        fill="white"
                                        stroke="hotpink"
                                        strokeWidth={10}
                                    />
                                    <Text x="38" y="55">4/5</Text>
                                </Svg>
                            </div>
                        </div>
                    </div>
                </Page>

                <Page size="A4" style={styles.body}>
                    <div style={{ position: "absolute", top: "10px", right: "15px", width: "60%" }}>
                        <div style={{ display: "flex", flexDirection: "row", width: "100%", backgroundColor: "#ddd", height: "15px" }}>
                            <div style={{ width: "60%", backgroundColor: "#7f53ac", height: "100%" }}>
                            </div>
                            <div style={{ width: "40%", backgroundColor: "lightpink", height: "100%" }}>
                            </div>
                        </div>
                    </div>
                    <div style={{ position: "absolute", bottom: "20px", left: "15px", width: "60%" }}>
                        <div style={{ display: "flex", flexDirection: "row", width: "100%", backgroundColor: "#ddd", height: "15px" }}>
                            <div style={{ width: "40%", backgroundColor: "#7f53ac", height: "100%" }}>
                            </div>
                            <div style={{ width: "60%", backgroundColor: "lightpink", height: "100%" }}>
                            </div>
                        </div>
                    </div>
                    <div style={{ position: "absolute", bottom: "15px", right: "30px", display: "flex", flexDirection: "column" }}>
                        <div style={{ display: "flex", flexDirection: "row", justifyContent: "flex-end" }}>
                            <Text style={{ fontSize: "10px" }}>
                                Powered By
                            </Text>
                        </div>
                        <Image src={logo} style={{ width: "130px", height: "100px", marginTop: "-30px" }} />
                    </div>
                    <div style={{ padding: "30px 40px", marginBottom: "20px" }}>
                        <Text style={styles.title}>MOTOR</Text>
                        <Text style={styles.title}>DEVELOPMENT</Text>
                    </div>
                    <div style={{ marginLeft: "20%", marginRight: "20px", width: "78%" }}>
                        <div style={{ height: "2px", widht: "100%", backgroundColor: "black" }} />
                    </div>
                    <div style={{ marginTop: "30px", paddingLeft: "50px" }}>
                        <Text style={{ fontSize: "15px", fontWeight: "bold", marginBottom: "15px" }}>
                            MOTOR DEVELOPMENT (2-3 YEARS)
                        </Text>
                        <div style={{ width: "20px", height: "3px", backgroundColor: "rgb(0, 180, 219)", marginBottom: "10px" }}></div>
                        <div style={{ display: "flex", flexDirection: "row" }}>
                            <div style={{ width: "60%", paddingRight: "20px" }}>
                                <Text style={{ fontSize: "12px", opacity: "0.6", marginBottom: "20px" }}>
                                    The ability to walk and move around freely, gives the child some control over his/her movement. The mobility expands his/her world. Mobility also enables the child to determine when and approach a certain movement and when to withdraw. At 3, a child can move about freely avoiding simple hazards and not getting hurt at least 8 out of 10 times. He/she can balance himself/herself while jumping with both feet, will be able to kick a large ball, will be able to go up the stairs using alternate feet.                                </Text>
                                <Text style={{ fontSize: "15px", fontWeight: "bold", marginBottom: "10px" }}>
                                    NIPUN'S REPORT
                                </Text>
                                <div style={{ width: "20px", height: "3px", backgroundColor: "hotpink", marginBottom: "10px" }}></div>
                                <Text style={{ fontSize: "12px", opacity: "0.6", marginBottom: "25px" }}>
                                    Following are the criteria used to measure the child's development.
                                </Text>
                                <div style={{ display: "flex", flexDirection: "column", paddingLeft: "10px" }}>
                                    <div style={{ display: "flex", flexDirection: "row", alignItems: "center", marginBottom: "10px" }}>
                                        <Image src={tick} style={{ width: "28px", height: "28px", marginRight: "10px" }} />
                                        <Text style={{ opacity: "0.6", fontSize: "12px" }}>Speak 15 different words in the right way</Text>
                                    </div>
                                    <div style={{ display: "flex", flexDirection: "row", alignItems: "center", marginBottom: "10px" }}>
                                        <Image src={tick} style={{ width: "28px", height: "28px", marginRight: "10px" }} />
                                        <Text style={{ opacity: "0.6", fontSize: "12px" }}>Speak 15 different words in the right way</Text>
                                    </div>
                                    <div style={{ display: "flex", flexDirection: "row", alignItems: "center", marginBottom: "10px" }}>
                                        <Image src={tick} style={{ width: "28px", height: "28px", marginRight: "10px" }} />
                                        <Text style={{ opacity: "0.6", fontSize: "12px" }}>Speak 15 different words in the right way</Text>
                                    </div>
                                    <div style={{ display: "flex", flexDirection: "row", alignItems: "center", marginBottom: "10px" }}>
                                        <Image src={cross} style={{ width: "28px", height: "28px", marginRight: "10px" }} />
                                        <Text style={{ opacity: "0.6", fontSize: "12px" }}>Speak 15 different words in the right way</Text>
                                    </div>
                                </div>
                            </div>
                            <div style={{ width: "30%", display: "flex", alignItems: "center", flexDirection: "column" }}>
                                <Text style={{ fontSize: "15px", fontWeight: "bold", marginBottom: "10px", color: "rgb(0, 180, 219)" }}>
                                    SCORE
                                </Text>
                                <Svg height="100" width="100">
                                    <Circle
                                        cx="50"
                                        cy="50"
                                        r="30"
                                        fill="white"
                                        stroke="hotpink"
                                        strokeWidth={10}
                                    />
                                    <Text x="38" y="55">4/5</Text>
                                </Svg>
                            </div>
                        </div>
                    </div>
                </Page>


                <Page size="A4" style={styles.body}>
                    <div style={{ position: "absolute", top: "10px", right: "15px", width: "60%" }}>
                        <div style={{ display: "flex", flexDirection: "row", width: "100%", backgroundColor: "#ddd", height: "15px" }}>
                            <div style={{ width: "60%", backgroundColor: "#7f53ac", height: "100%" }}>
                            </div>
                            <div style={{ width: "40%", backgroundColor: "lightpink", height: "100%" }}>
                            </div>
                        </div>
                    </div>
                    <div style={{ position: "absolute", bottom: "20px", left: "15px", width: "60%" }}>
                        <div style={{ display: "flex", flexDirection: "row", width: "100%", backgroundColor: "#ddd", height: "15px" }}>
                            <div style={{ width: "40%", backgroundColor: "#7f53ac", height: "100%" }}>
                            </div>
                            <div style={{ width: "60%", backgroundColor: "lightpink", height: "100%" }}>
                            </div>
                        </div>
                    </div>
                    <div style={{ position: "absolute", bottom: "15px", right: "30px", display: "flex", flexDirection: "column" }}>
                        <div style={{ display: "flex", flexDirection: "row", justifyContent: "flex-end" }}>
                            <Text style={{ fontSize: "10px" }}>
                                Powered By
                            </Text>
                        </div>
                        <Image src={logo} style={{ width: "130px", height: "100px", marginTop: "-30px" }} />
                    </div>
                    <div style={{ padding: "30px 40px", marginBottom: "20px" }}>
                        <Text style={styles.title}>SOCIAL</Text>
                        <Text style={styles.title}>DEVELOPMENT</Text>
                    </div>
                    <div style={{ marginLeft: "20%", marginRight: "20px", width: "78%" }}>
                        <div style={{ height: "2px", widht: "100%", backgroundColor: "black" }} />
                    </div>
                    <div style={{ marginTop: "30px", paddingLeft: "50px" }}>
                        <Text style={{ fontSize: "15px", fontWeight: "bold", marginBottom: "15px" }}>
                            SOCIAL DEVELOPMENT (2-3 YEARS)
                        </Text>
                        <div style={{ width: "20px", height: "3px", backgroundColor: "rgb(0, 180, 219)", marginBottom: "10px" }}></div>
                        <div style={{ display: "flex", flexDirection: "row" }}>
                            <div style={{ width: "60%", paddingRight: "20px" }}>
                                <Text style={{ fontSize: "12px", opacity: "0.6", marginBottom: "20px" }}>
                                    By the age of 3, children will start picking up social cues. They indulge in exploratory behavior and start expressing their preferences. They would want to participate in group activities, would be able to understand and verbalize when they need to use the toilet and help themselves with food.                                </Text>
                                <Text style={{ fontSize: "15px", fontWeight: "bold", marginBottom: "10px" }}>
                                    NIPUN'S REPORT
                                </Text>
                                <div style={{ width: "20px", height: "3px", backgroundColor: "hotpink", marginBottom: "10px" }}></div>
                                <Text style={{ fontSize: "12px", opacity: "0.6", marginBottom: "25px" }}>
                                    Following are the criteria used to measure the child's development.
                                </Text>
                                <div style={{ display: "flex", flexDirection: "column", paddingLeft: "10px" }}>
                                    <div style={{ display: "flex", flexDirection: "row", alignItems: "center", marginBottom: "10px" }}>
                                        <Image src={tick} style={{ width: "28px", height: "28px", marginRight: "10px" }} />
                                        <Text style={{ opacity: "0.6", fontSize: "12px" }}>Speak 15 different words in the right way</Text>
                                    </div>
                                    <div style={{ display: "flex", flexDirection: "row", alignItems: "center", marginBottom: "10px" }}>
                                        <Image src={tick} style={{ width: "28px", height: "28px", marginRight: "10px" }} />
                                        <Text style={{ opacity: "0.6", fontSize: "12px" }}>Speak 15 different words in the right way</Text>
                                    </div>
                                    <div style={{ display: "flex", flexDirection: "row", alignItems: "center", marginBottom: "10px" }}>
                                        <Image src={tick} style={{ width: "28px", height: "28px", marginRight: "10px" }} />
                                        <Text style={{ opacity: "0.6", fontSize: "12px" }}>Speak 15 different words in the right way</Text>
                                    </div>
                                    <div style={{ display: "flex", flexDirection: "row", alignItems: "center", marginBottom: "10px" }}>
                                        <Image src={cross} style={{ width: "28px", height: "28px", marginRight: "10px" }} />
                                        <Text style={{ opacity: "0.6", fontSize: "12px" }}>Speak 15 different words in the right way</Text>
                                    </div>
                                </div>
                            </div>
                            <div style={{ width: "30%", display: "flex", alignItems: "center", flexDirection: "column" }}>
                                <Text style={{ fontSize: "15px", fontWeight: "bold", marginBottom: "10px", color: "rgb(0, 180, 219)" }}>
                                    SCORE
                                </Text>
                                <Svg height="100" width="100">
                                    <Circle
                                        cx="50"
                                        cy="50"
                                        r="30"
                                        fill="white"
                                        stroke="hotpink"
                                        strokeWidth={10}
                                    />
                                    <Text x="38" y="55">4/5</Text>
                                </Svg>
                            </div>
                        </div>
                    </div>
                </Page>


                <Page size="A4" style={styles.body}>
                    <div style={{ position: "absolute", top: "10px", right: "15px", width: "60%" }}>
                        <div style={{ display: "flex", flexDirection: "row", width: "100%", backgroundColor: "#ddd", height: "15px" }}>
                            <div style={{ width: "60%", backgroundColor: "#7f53ac", height: "100%" }}>
                            </div>
                            <div style={{ width: "40%", backgroundColor: "lightpink", height: "100%" }}>
                            </div>
                        </div>
                    </div>
                    <div style={{ position: "absolute", bottom: "20px", left: "15px", width: "60%" }}>
                        <div style={{ display: "flex", flexDirection: "row", width: "100%", backgroundColor: "#ddd", height: "15px" }}>
                            <div style={{ width: "40%", backgroundColor: "#7f53ac", height: "100%" }}>
                            </div>
                            <div style={{ width: "60%", backgroundColor: "lightpink", height: "100%" }}>
                            </div>
                        </div>
                    </div>
                    <div style={{ position: "absolute", bottom: "15px", right: "30px", display: "flex", flexDirection: "column" }}>
                        <div style={{ display: "flex", flexDirection: "row", justifyContent: "flex-end" }}>
                            <Text style={{ fontSize: "10px" }}>
                                Powered By
                            </Text>
                        </div>
                        <Image src={logo} style={{ width: "130px", height: "100px", marginTop: "-30px" }} />
                    </div>
                    <div style={{ padding: "30px 40px", marginBottom: "20px" }}>
                        <Text style={styles.title}>COGNITIVE</Text>
                        <Text style={styles.title}>DEVELOPMENT</Text>
                    </div>
                    <div style={{ marginLeft: "20%", marginRight: "20px", width: "78%" }}>
                        <div style={{ height: "2px", widht: "100%", backgroundColor: "black" }} />
                    </div>
                    <div style={{ marginTop: "30px", paddingLeft: "50px" }}>
                        <Text style={{ fontSize: "15px", fontWeight: "bold", marginBottom: "15px" }}>
                            COGNITIVE DEVELOPMENT (2-3 YEARS)
                        </Text>
                        <div style={{ width: "20px", height: "3px", backgroundColor: "rgb(0, 180, 219)", marginBottom: "10px" }}></div>
                        <div style={{ display: "flex", flexDirection: "row" }}>
                            <div style={{ width: "60%", paddingRight: "20px" }}>
                                <Text style={{ fontSize: "12px", opacity: "0.6", marginBottom: "20px" }}>
                                    Cognitive development of the child reflects the overall 5/5 development of the child in the rest of the domains
                                    (Speech and Language, Motor, Social and Emotional
                                    Skills). By the age of 3, the child can understand the
                                    simple rules during group activities. They can create new behaviors from old ones (originality) and engage in
                                    symbolic activity. When inquired, he/she would be able answer and to relate to his/her day to day experiences. He/she would be able to identify themselves with their name and gender.                                </Text>
                                <Text style={{ fontSize: "15px", fontWeight: "bold", marginBottom: "10px" }}>
                                    NIPUN'S REPORT
                                </Text>
                                <div style={{ width: "20px", height: "3px", backgroundColor: "hotpink", marginBottom: "10px" }}></div>
                                <Text style={{ fontSize: "12px", opacity: "0.6", marginBottom: "25px" }}>
                                    Following are the criteria used to measure the child's development.
                                </Text>
                                <div style={{ display: "flex", flexDirection: "column", paddingLeft: "10px" }}>
                                    <div style={{ display: "flex", flexDirection: "row", alignItems: "center", marginBottom: "10px" }}>
                                        <Image src={tick} style={{ width: "28px", height: "28px", marginRight: "10px" }} />
                                        <Text style={{ opacity: "0.6", fontSize: "12px" }}>Speak 15 different words in the right way</Text>
                                    </div>
                                    <div style={{ display: "flex", flexDirection: "row", alignItems: "center", marginBottom: "10px" }}>
                                        <Image src={tick} style={{ width: "28px", height: "28px", marginRight: "10px" }} />
                                        <Text style={{ opacity: "0.6", fontSize: "12px" }}>Speak 15 different words in the right way</Text>
                                    </div>
                                    <div style={{ display: "flex", flexDirection: "row", alignItems: "center", marginBottom: "10px" }}>
                                        <Image src={tick} style={{ width: "28px", height: "28px", marginRight: "10px" }} />
                                        <Text style={{ opacity: "0.6", fontSize: "12px" }}>Speak 15 different words in the right way</Text>
                                    </div>
                                    <div style={{ display: "flex", flexDirection: "row", alignItems: "center", marginBottom: "10px" }}>
                                        <Image src={cross} style={{ width: "28px", height: "28px", marginRight: "10px" }} />
                                        <Text style={{ opacity: "0.6", fontSize: "12px" }}>Speak 15 different words in the right way</Text>
                                    </div>
                                </div>
                            </div>
                            <div style={{ width: "30%", display: "flex", alignItems: "center", flexDirection: "column" }}>
                                <Text style={{ fontSize: "15px", fontWeight: "bold", marginBottom: "10px", color: "rgb(0, 180, 219)" }}>
                                    SCORE
                                </Text>
                                <Svg height="100" width="100">
                                    <Circle
                                        cx="50"
                                        cy="50"
                                        r="30"
                                        fill="white"
                                        stroke="hotpink"
                                        strokeWidth={10}
                                    />
                                    <Text x="38" y="55">4/5</Text>
                                </Svg>
                            </div>
                        </div>
                    </div>
                </Page>


                <Page size="A4" style={styles.body}>
                    <div style={{ position: "absolute", top: "10px", right: "15px", width: "60%" }}>
                        <div style={{ display: "flex", flexDirection: "row", width: "100%", backgroundColor: "#ddd", height: "15px" }}>
                            <div style={{ width: "60%", backgroundColor: "#7f53ac", height: "100%" }}>
                            </div>
                            <div style={{ width: "40%", backgroundColor: "lightpink", height: "100%" }}>
                            </div>
                        </div>
                    </div>
                    <div style={{ position: "absolute", bottom: "20px", left: "15px", width: "60%" }}>
                        <div style={{ display: "flex", flexDirection: "row", width: "100%", backgroundColor: "#ddd", height: "15px" }}>
                            <div style={{ width: "40%", backgroundColor: "#7f53ac", height: "100%" }}>
                            </div>
                            <div style={{ width: "60%", backgroundColor: "lightpink", height: "100%" }}>
                            </div>
                        </div>
                    </div>
                    <div style={{ position: "absolute", bottom: "15px", right: "30px", display: "flex", flexDirection: "column" }}>
                        <div style={{ display: "flex", flexDirection: "row", justifyContent: "flex-end" }}>
                            <Text style={{ fontSize: "10px" }}>
                                Powered By
                            </Text>
                        </div>
                        <Image src={logo} style={{ width: "130px", height: "100px", marginTop: "-30px" }} />
                    </div>
                    <div style={{ padding: "30px 40px", marginBottom: "20px" }}>
                        <Text style={styles.title}>EMOTIONAL</Text>
                        <Text style={styles.title}>DEVELOPMENT</Text>
                    </div>
                    <div style={{ marginLeft: "20%", marginRight: "20px", width: "78%" }}>
                        <div style={{ height: "2px", widht: "100%", backgroundColor: "black" }} />
                    </div>
                    <div style={{ marginTop: "30px", paddingLeft: "50px" }}>
                        <Text style={{ fontSize: "15px", fontWeight: "bold", marginBottom: "15px" }}>
                            EMOTIONAL DEVELOPMENT (2-3 YEARS)
                        </Text>
                        <div style={{ width: "20px", height: "3px", backgroundColor: "rgb(0, 180, 219)", marginBottom: "10px" }}></div>
                        <div style={{ display: "flex", flexDirection: "row" }}>
                            <div style={{ width: "60%", paddingRight: "20px" }}>
                                <Text style={{ fontSize: "12px", opacity: "0.6", marginBottom: "20px" }}>
                                    At the age of 3, the child develops the capacity for organized demonstration of love for e.g. when the child runs up and hugs, kisses and tries to speak all at the same time. Comfort with family and apprehension with strangers would be present. He/she would be able ot understand and relate when happy and when distressed.                                </Text>
                                <Text style={{ fontSize: "15px", fontWeight: "bold", marginBottom: "10px" }}>
                                    NIPUN'S REPORT
                                </Text>
                                <div style={{ width: "20px", height: "3px", backgroundColor: "hotpink", marginBottom: "10px" }}></div>
                                <Text style={{ fontSize: "12px", opacity: "0.6", marginBottom: "25px" }}>
                                    Following are the criteria used to measure the child's development.
                                </Text>
                                <div style={{ display: "flex", flexDirection: "column", paddingLeft: "10px" }}>
                                    <div style={{ display: "flex", flexDirection: "row", alignItems: "center", marginBottom: "10px" }}>
                                        <Image src={tick} style={{ width: "28px", height: "28px", marginRight: "10px" }} />
                                        <Text style={{ opacity: "0.6", fontSize: "12px" }}>Speak 15 different words in the right way</Text>
                                    </div>
                                    <div style={{ display: "flex", flexDirection: "row", alignItems: "center", marginBottom: "10px" }}>
                                        <Image src={tick} style={{ width: "28px", height: "28px", marginRight: "10px" }} />
                                        <Text style={{ opacity: "0.6", fontSize: "12px" }}>Speak 15 different words in the right way</Text>
                                    </div>
                                    <div style={{ display: "flex", flexDirection: "row", alignItems: "center", marginBottom: "10px" }}>
                                        <Image src={tick} style={{ width: "28px", height: "28px", marginRight: "10px" }} />
                                        <Text style={{ opacity: "0.6", fontSize: "12px" }}>Speak 15 different words in the right way</Text>
                                    </div>
                                    <div style={{ display: "flex", flexDirection: "row", alignItems: "center", marginBottom: "10px" }}>
                                        <Image src={cross} style={{ width: "28px", height: "28px", marginRight: "10px" }} />
                                        <Text style={{ opacity: "0.6", fontSize: "12px" }}>Speak 15 different words in the right way</Text>
                                    </div>
                                </div>
                            </div>
                            <div style={{ width: "30%", display: "flex", alignItems: "center", flexDirection: "column" }}>
                                <Text style={{ fontSize: "15px", fontWeight: "bold", marginBottom: "10px", color: "rgb(0, 180, 219)" }}>
                                    SCORE
                                </Text>
                                <Svg height="100" width="100">
                                    <Circle
                                        cx="50"
                                        cy="50"
                                        r="30"
                                        fill="white"
                                        stroke="hotpink"
                                        strokeWidth={10}
                                    />
                                    <Text x="38" y="55">4/5</Text>
                                </Svg>
                            </div>
                        </div>
                    </div>
                </Page>

                <Page size="A4" style={styles.body}>
                    <div style={{ position: "absolute", top: "10px", right: "15px", width: "60%" }}>
                        <div style={{ display: "flex", flexDirection: "row", width: "100%", backgroundColor: "#ddd", height: "15px" }}>
                            <div style={{ width: "60%", backgroundColor: "#7f53ac", height: "100%" }}>
                            </div>
                            <div style={{ width: "40%", backgroundColor: "lightpink", height: "100%" }}>
                            </div>
                        </div>
                    </div>
                    <div style={{ position: "absolute", bottom: "20px", left: "15px", width: "60%" }}>
                        <div style={{ display: "flex", flexDirection: "row", width: "100%", backgroundColor: "#ddd", height: "15px" }}>
                            <div style={{ width: "40%", backgroundColor: "#7f53ac", height: "100%" }}>
                            </div>
                            <div style={{ width: "60%", backgroundColor: "lightpink", height: "100%" }}>
                            </div>
                        </div>
                    </div>
                    <div style={{ position: "absolute", bottom: "15px", right: "30px", display: "flex", flexDirection: "column" }}>
                        <div style={{ display: "flex", flexDirection: "row", justifyContent: "flex-end" }}>
                            <Text style={{ fontSize: "10px" }}>
                                Powered By
                            </Text>
                        </div>
                        <Image src={logo} style={{ width: "130px", height: "100px", marginTop: "-30px" }} />
                    </div>
                    <div style={{ padding: "30px 40px", marginBottom: "20px" }}>
                        <Text style={styles.title}>SENSORY</Text>
                        <Text style={styles.title}>DEVELOPMENT</Text>
                    </div>
                    <div style={{ marginLeft: "20%", marginRight: "20px", width: "78%" }}>
                        <div style={{ height: "2px", widht: "100%", backgroundColor: "black" }} />
                    </div>
                    <div style={{ marginTop: "30px", paddingLeft: "50px" }}>
                        <Text style={{ fontSize: "15px", fontWeight: "bold", marginBottom: "15px" }}>
                            SENSORY DEVELOPMENT (2-3 YEARS)
                        </Text>
                        <div style={{ width: "20px", height: "3px", backgroundColor: "rgb(0, 180, 219)", marginBottom: "10px" }}></div>
                        <div style={{ display: "flex", flexDirection: "row" }}>
                            <div style={{ width: "60%", paddingRight: "20px" }}>
                                <Text style={{ fontSize: "12px", opacity: "0.6", marginBottom: "20px" }}>
                                    Everything the child does involves one or the other senses. It is through the senses that the child discovers the world around himher and starts to
                                    learn. At the age of 3, the child would cooperate with dressing and would like to dress up for occasions. Heshe would explore tovs and different obiects
                                    using his/her hands. The child would also like to touch and feel various things in his/her environment. Children in this age also enjoy messy play. The child would eat a range of foods.
                                </Text>
                                <Text style={{ fontSize: "15px", fontWeight: "bold", marginBottom: "10px" }}>
                                    NIPUN'S REPORT
                                </Text>
                                <div style={{ width: "20px", height: "3px", backgroundColor: "hotpink", marginBottom: "10px" }}></div>
                                <Text style={{ fontSize: "12px", opacity: "0.6", marginBottom: "25px" }}>
                                    Following are the criteria used to measure the child's development.
                                </Text>
                                <div style={{ display: "flex", flexDirection: "column", paddingLeft: "10px" }}>
                                    <div style={{ display: "flex", flexDirection: "row", alignItems: "center", marginBottom: "10px" }}>
                                        <Image src={tick} style={{ width: "28px", height: "28px", marginRight: "10px" }} />
                                        <Text style={{ opacity: "0.6", fontSize: "12px" }}>Speak 15 different words in the right way</Text>
                                    </div>
                                    <div style={{ display: "flex", flexDirection: "row", alignItems: "center", marginBottom: "10px" }}>
                                        <Image src={tick} style={{ width: "28px", height: "28px", marginRight: "10px" }} />
                                        <Text style={{ opacity: "0.6", fontSize: "12px" }}>Speak 15 different words in the right way</Text>
                                    </div>
                                    <div style={{ display: "flex", flexDirection: "row", alignItems: "center", marginBottom: "10px" }}>
                                        <Image src={tick} style={{ width: "28px", height: "28px", marginRight: "10px" }} />
                                        <Text style={{ opacity: "0.6", fontSize: "12px" }}>Speak 15 different words in the right way</Text>
                                    </div>
                                    <div style={{ display: "flex", flexDirection: "row", alignItems: "center", marginBottom: "10px" }}>
                                        <Image src={cross} style={{ width: "28px", height: "28px", marginRight: "10px" }} />
                                        <Text style={{ opacity: "0.6", fontSize: "12px" }}>Speak 15 different words in the right way</Text>
                                    </div>
                                </div>
                            </div>
                            <div style={{ width: "30%", display: "flex", alignItems: "center", flexDirection: "column" }}>
                                <Text style={{ fontSize: "15px", fontWeight: "bold", marginBottom: "10px", color: "rgb(0, 180, 219)" }}>
                                    SCORE
                                </Text>
                                <Svg height="100" width="100">
                                    <Circle
                                        cx="50"
                                        cy="50"
                                        r="30"
                                        fill="white"
                                        stroke="hotpink"
                                        strokeWidth={10}
                                    />
                                    <Text x="38" y="55">4/5</Text>
                                </Svg>
                            </div>
                        </div>
                    </div>
                </Page>

                <Page size="A4" style={styles.body}>
                    <div style={{ position: "absolute", top: "10px", right: "15px", width: "60%" }}>
                        <div style={{ display: "flex", flexDirection: "row", width: "100%", backgroundColor: "#ddd", height: "15px" }}>
                            <div style={{ width: "60%", backgroundColor: "#7f53ac", height: "100%" }}>
                            </div>
                            <div style={{ width: "40%", backgroundColor: "lightpink", height: "100%" }}>
                            </div>
                        </div>
                    </div>
                    <div style={{ position: "absolute", bottom: "20px", left: "15px", width: "60%" }}>
                        <div style={{ display: "flex", flexDirection: "row", width: "100%", backgroundColor: "#ddd", height: "15px" }}>
                            <div style={{ width: "40%", backgroundColor: "#7f53ac", height: "100%" }}>
                            </div>
                            <div style={{ width: "60%", backgroundColor: "lightpink", height: "100%" }}>
                            </div>
                        </div>
                    </div>
                    <div style={{ position: "absolute", bottom: "15px", right: "30px", display: "flex", flexDirection: "column" }}>
                        <div style={{ display: "flex", flexDirection: "row", justifyContent: "flex-end" }}>
                            <Text style={{ fontSize: "10px" }}>
                                Powered By
                            </Text>
                        </div>
                        <Image src={logo} style={{ width: "130px", height: "100px", marginTop: "-30px" }} />
                    </div>
                    <div style={{ padding: "30px 40px", marginBottom: "20px" }}>
                        <Text style={styles.title}>BEHAVIOUR</Text>
                        <Text style={styles.title}>DEVELOPMENT</Text>
                    </div>
                    <div style={{ marginLeft: "20%", marginRight: "20px", width: "78%" }}>
                        <div style={{ height: "2px", widht: "100%", backgroundColor: "black" }} />
                    </div>
                    <div style={{ marginTop: "30px", paddingLeft: "50px" }}>
                        <Text style={{ fontSize: "15px", fontWeight: "bold", marginBottom: "15px" }}>
                            BEHAVIOUR DEVELOPMENT (2-3 YEARS)
                        </Text>
                        <div style={{ width: "20px", height: "3px", backgroundColor: "rgb(0, 180, 219)", marginBottom: "10px" }}></div>
                        <div style={{ display: "flex", flexDirection: "row" }}>
                            <div style={{ width: "60%", paddingRight: "20px" }}>
                                <Text style={{ fontSize: "12px", opacity: "0.6", marginBottom: "20px" }}>
                                    Around the age of 3, a child is realizing that they are separate individual from their parents and caregivers.
                                    They start learning to express their likes and dislikes though their behaviour and act independently. In the classroom, the child would be curious with the new toys, would like to play with other kids a n d try to follow what the teachers are asking them ot do.
                                </Text>
                                <Text style={{ fontSize: "15px", fontWeight: "bold", marginBottom: "10px" }}>
                                    NIPUN'S REPORT
                                </Text>
                                <div style={{ width: "20px", height: "3px", backgroundColor: "hotpink", marginBottom: "10px" }}></div>
                                <Text style={{ fontSize: "12px", opacity: "0.6", marginBottom: "25px" }}>
                                    Following are the criteria used to measure the child's development.
                                </Text>
                                <div style={{ display: "flex", flexDirection: "column", paddingLeft: "10px" }}>
                                    <div style={{ display: "flex", flexDirection: "row", alignItems: "center", marginBottom: "10px" }}>
                                        <Image src={tick} style={{ width: "28px", height: "28px", marginRight: "10px" }} />
                                        <Text style={{ opacity: "0.6", fontSize: "12px" }}>Speak 15 different words in the right way</Text>
                                    </div>
                                    <div style={{ display: "flex", flexDirection: "row", alignItems: "center", marginBottom: "10px" }}>
                                        <Image src={tick} style={{ width: "28px", height: "28px", marginRight: "10px" }} />
                                        <Text style={{ opacity: "0.6", fontSize: "12px" }}>Speak 15 different words in the right way</Text>
                                    </div>
                                    <div style={{ display: "flex", flexDirection: "row", alignItems: "center", marginBottom: "10px" }}>
                                        <Image src={tick} style={{ width: "28px", height: "28px", marginRight: "10px" }} />
                                        <Text style={{ opacity: "0.6", fontSize: "12px" }}>Speak 15 different words in the right way</Text>
                                    </div>
                                    <div style={{ display: "flex", flexDirection: "row", alignItems: "center", marginBottom: "10px" }}>
                                        <Image src={cross} style={{ width: "28px", height: "28px", marginRight: "10px" }} />
                                        <Text style={{ opacity: "0.6", fontSize: "12px" }}>Speak 15 different words in the right way</Text>
                                    </div>
                                </div>
                            </div>
                            <div style={{ width: "30%", display: "flex", alignItems: "center", flexDirection: "column" }}>
                                <Text style={{ fontSize: "15px", fontWeight: "bold", marginBottom: "10px", color: "rgb(0, 180, 219)" }}>
                                    SCORE
                                </Text>
                                <Svg height="100" width="100">
                                    <Circle
                                        cx="50"
                                        cy="50"
                                        r="30"
                                        fill="white"
                                        stroke="hotpink"
                                        strokeWidth={10}
                                    />
                                    <Text x="38" y="55">4/5</Text>
                                </Svg>
                            </div>
                        </div>
                    </div>
                </Page>

                <Page size="A4" style={styles.body}>
                    <div style={{ position: "absolute", top: "10px", right: "15px", width: "60%" }}>
                        <div style={{ display: "flex", flexDirection: "row", width: "100%", backgroundColor: "#ddd", height: "15px" }}>
                            <div style={{ width: "60%", backgroundColor: "#7f53ac", height: "100%" }}>
                            </div>
                            <div style={{ width: "40%", backgroundColor: "lightpink", height: "100%" }}>
                            </div>
                        </div>
                    </div>
                    <div style={{ position: "absolute", bottom: "20px", left: "15px", width: "60%" }}>
                        <div style={{ display: "flex", flexDirection: "row", width: "100%", backgroundColor: "#ddd", height: "15px" }}>
                            <div style={{ width: "40%", backgroundColor: "#7f53ac", height: "100%" }}>
                            </div>
                            <div style={{ width: "60%", backgroundColor: "lightpink", height: "100%" }}>
                            </div>
                        </div>
                    </div>
                    <div style={{ position: "absolute", bottom: "15px", right: "30px", display: "flex", flexDirection: "column" }}>
                        <div style={{ display: "flex", flexDirection: "row", justifyContent: "flex-end" }}>
                            <Text style={{ fontSize: "10px" }}>
                                Powered By
                            </Text>
                        </div>
                        <Image src={logo} style={{ width: "130px", height: "100px", marginTop: "-30px" }} />
                    </div>
                    <div style={{ padding: "30px 40px", marginBottom: "20px" }}>
                        <Text style={styles.title}>SUMMARY AND</Text>
                        <Text style={styles.title}>RECOMMENDATIONS</Text>
                    </div>
                    <div style={{ marginLeft: "20%", marginRight: "20px", width: "78%" }}>
                        <div style={{ height: "2px", widht: "100%", backgroundColor: "black" }} />
                    </div>
                    <div style={{ marginTop: "30px", paddingLeft: "50px" }}>
                        <Text style={{ fontSize: "15px", fontWeight: "bold", marginBottom: "15px" }}>
                            SUMMARY
                        </Text>
                        <div style={{ width: "20px", height: "3px", backgroundColor: "rgb(0, 180, 219)", marginBottom: "10px" }}></div>
                        <div style={{ display: "flex", flexDirection: "row" }}>
                            <div style={{ width: "100%", paddingRight: "20px" }}>
                                <Text style={{ fontSize: "12px", opacity: "0.6", marginBottom: "20px" }}>
                                    The total scores obtained by Aaditri on Developmental Screening Checklist is 23, which makes the child fall in the range of<Text  style={{ fontSize: "12px",fontWeight:"bold",opacity:"1"}}> Moderate Developmental Delay.</Text>
                                </Text>
                                <Text style={{ fontSize: "15px", fontWeight: "bold", marginBottom: "10px" }}>
                                    RECOMMENDATIONS
                                </Text>
                                <div style={{ width: "20px", height: "3px", backgroundColor: "hotpink", marginBottom: "10px" }}></div>
                                <Text style={{ fontSize: "12px", opacity: "0.6", marginBottom: "25px" }}>
                                    Following are the criteria used to measure the child's development.
                                </Text>
                                <div style={{ display: "flex", flexDirection: "column", paddingLeft: "10px" }}>
                                    <div style={{ display: "flex", flexDirection: "row", alignItems: "center", marginBottom: "10px" }}>
                                        <Text style={{ fontSize: "12px", fontWeight: "bold" }}>1. </Text>
                                        <Text style={{ opacity: "0.6", fontSize: "12px" }}>Speak 15 different words in the right way</Text>
                                    </div>
                                    <div style={{ display: "flex", flexDirection: "row", alignItems: "center", marginBottom: "10px" }}>
                                        <Text style={{ fontSize: "12px", fontWeight: "bold" }}>2. </Text>
                                        <Text style={{ opacity: "0.6", fontSize: "12px" }}>Speak 15 different words in the right way</Text>
                                    </div>
                                    <div style={{ display: "flex", flexDirection: "row", alignItems: "center", marginBottom: "10px" }}>
                                        <Text style={{ fontSize: "12px", fontWeight: "bold" }}>3. </Text>
                                        <Text style={{ opacity: "0.6", fontSize: "12px" }}>Speak 15 different words in the right way</Text>
                                    </div>
                                    <div style={{ display: "flex", flexDirection: "row", alignItems: "center", marginBottom: "10px" }}>
                                        <Text style={{ fontSize: "12px", fontWeight: "bold" }}>4. </Text>
                                        <Text style={{ opacity: "0.6", fontSize: "12px" }}>Speak 15 different words in the right way</Text>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Page>
            </Document>
        </PDFViewer>
    )
}
