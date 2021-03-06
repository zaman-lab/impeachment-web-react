
import React from 'react'
import Container from 'react-bootstrap/Container'
//import Row from 'react-bootstrap/Row'
//import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'

import DetectionChart from "../Detection/DetectionChart"

export default function BotOpinionsSection() {

    return (
        <Container fluid>
            <Card>
                <Card.Body>
                    <Card.Title><h3>Bot Opinions</h3></Card.Title>

                    <Card.Text>
                        After applying our trained <a href="/opinion-models">Impeachment opinion model</a> to bot tweets,
                        {" "} we observe ten thousand bots exhibit anti-Trump opinions and 14 thousand bots exhibit pro-Trump opinions.
                    </Card.Text>
                    <DetectionChart/>

                    <Card.Text>
                        For more information about each of these bot communities, see
                        {" "} <a href="/bot-beneficiaries">who they were retweeting</a> and
                        {" "} <a href="/bot-language">what they were talking about</a>.

                    </Card.Text>

                </Card.Body>
            </Card>
        </Container>
    )
}
