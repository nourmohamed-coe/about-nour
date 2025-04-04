import React, { useEffect, useState } from 'react';
import AWS from '../aws-config';
import { Link } from 'react-router-dom';

const Main = () => {
    const [mainData, setMainData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const dynamoDb = new AWS.DynamoDB.DocumentClient();

            const params = {
                TableName: 'Main',
                Key: {
                    MainPage: 'No Tabs',
                },
            };

            console.log('Fetching data with params:', params);

            try {
                const data = await dynamoDb.get(params).promise();
                console.log('Data fetched:', data);

                if (data.Item) {
                    console.log('Item found:', data.Item);
                    setMainData(data.Item);
                } else {
                    console.error('No data found for the given key.');
                }
            } catch (error) {
                console.error('Error fetching main data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="main-container">
            <h1>Main</h1>
            {mainData ? (
                <div className="content">
                    <img src={mainData.ComputerEngineerPicture} alt="Computer Engineer" />
                    <div className="bio">
                        <h2>Purpose</h2>
                        <p>{mainData.Purpose}</p>
                        <h2 className="button-directions">Click below to explore more!</h2>
                        <div className="button-container">
                            <Link to="/projects/about-nour" className="oval-button">About Nour Website Project</Link>
                        </div>
                    </div>
                </div>
            ) : (
                <p>No main data found.</p>
            )}
        </div>
    );
};

export default Main;