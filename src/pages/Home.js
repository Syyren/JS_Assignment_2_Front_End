import Layout from "../components/Layout";
import { Link } from "react-router-dom";

export default function Home()
{
    return(
        <Layout>
            <h2 className="display-4 mb-4">Home Page</h2>
            <div className="container">
                <img src="https://media.tenor.com/CC1VPnwBVMMAAAAi/gianbortion-cat.gif" alt="dancing cat gif"></img>
                <img src="https://media.tenor.com/CC1VPnwBVMMAAAAi/gianbortion-cat.gif" alt="dancing cat gif"></img>
                <img src="https://media.tenor.com/CC1VPnwBVMMAAAAi/gianbortion-cat.gif" alt="dancing cat gif"></img>
            </div>
            <div className="container">
                <img src="https://media.tenor.com/CC1VPnwBVMMAAAAi/gianbortion-cat.gif" alt="dancing cat gif"></img>
                <img src="https://media.tenor.com/ULt1QoO_tc0AAAAj/cat-vibe-vibe-cat.gif" alt="vibing cat gif"></img>
                <img src="https://media.tenor.com/CC1VPnwBVMMAAAAi/gianbortion-cat.gif" alt="dancing cat gif"></img>
            </div>
            <div className="container">
                <img src="https://media.tenor.com/CC1VPnwBVMMAAAAi/gianbortion-cat.gif" alt="dancing cat gif"></img>
                <img src="https://media.tenor.com/CC1VPnwBVMMAAAAi/gianbortion-cat.gif" alt="dancing cat gif"></img>
                <img src="https://media.tenor.com/CC1VPnwBVMMAAAAi/gianbortion-cat.gif" alt="dancing cat gif"></img>
            </div>
            <p>Hello! Welcome to my Contact Manager application!</p>
            <p>I hope you enjoy it!</p>
            <p>Please click either <Link to="/contacts">here</Link> or on "Contacts" above to get started.</p>
        </Layout> 
    )
}