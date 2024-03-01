import Layout from "../components/Layout";
import { Link } from "react-router-dom";

//establishing my home page, it's just a silly page with cat gifs and a brief project overview
export default function Home()
{
    return(
        <Layout>
            <h2 className="display-4 mb-4 text-center">Home Page</h2>
            <div className="text-center">
                <p>Hello! Welcome to my Contact Manager application!</p>
                <p>I hope you enjoy it!</p>
                <p>Please click either <Link to="/contacts">here</Link> or on "Contacts" above to get started.</p>
            </div>
            <div className="d-flex justify-content-center">
                <img src="https://media.tenor.com/CC1VPnwBVMMAAAAi/gianbortion-cat.gif" alt="dancing cat gif"></img>
                <img src="https://media.tenor.com/CC1VPnwBVMMAAAAi/gianbortion-cat.gif" alt="dancing cat gif"></img>
                <img src="https://media.tenor.com/CC1VPnwBVMMAAAAi/gianbortion-cat.gif" alt="dancing cat gif"></img>
            </div>
            <div className="d-flex justify-content-center">
                <img src="https://media.tenor.com/CC1VPnwBVMMAAAAi/gianbortion-cat.gif" alt="dancing cat gif"></img>
                <img src="https://media.tenor.com/ULt1QoO_tc0AAAAj/cat-vibe-vibe-cat.gif" alt="vibing cat gif"></img>
                <img src="https://media.tenor.com/CC1VPnwBVMMAAAAi/gianbortion-cat.gif" alt="dancing cat gif"></img>
            </div>
            <div className="d-flex justify-content-center">
                <img src="https://media.tenor.com/CC1VPnwBVMMAAAAi/gianbortion-cat.gif" alt="dancing cat gif"></img>
                <img src="https://media.tenor.com/CC1VPnwBVMMAAAAi/gianbortion-cat.gif" alt="dancing cat gif"></img>
                <img src="https://media.tenor.com/CC1VPnwBVMMAAAAi/gianbortion-cat.gif" alt="dancing cat gif"></img>
            </div>
        </Layout> 
    )
}