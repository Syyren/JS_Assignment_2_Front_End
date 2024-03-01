import Layout from "../components/Layout";

export default function About()
{
    return(
        <Layout>
            <h2 className="display-4 mb-4 text-center">About Page</h2>

            <p className="text-center">
                This web app is designed in React to interact with a back end programmed in
                node.js and a database made on MongoDB. Creating a full stackMERN app. The 
                app will then nicely and cleanly display a list of contacts that can be added 
                to, edited, and deleted from.
            </p>
        </Layout> 
    )
}