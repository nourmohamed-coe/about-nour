import React, { useEffect, useState } from 'react';
import AWS from '../aws-config';

const Profile = ({ type }) => {
    const [profile, setProfile] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const dynamoDb = new AWS.DynamoDB.DocumentClient();

            const params = {
                TableName: 'Profile',
                Key: {
                    TypeOfProfile: type, 
                },
            };

            try {
                const data = await dynamoDb.get(params).promise();
                if (data.Item) {
                    setProfile(data.Item);
                } else {
                    console.error('No data found for the given key.');
                }
            } catch (error) {
                console.error('Error fetching profile:', error);
            }
        };

        fetchData();
    }, [type]);

    return (

        <div className={`profile-container ${type.toLowerCase()}`}>
            <p>Profile / {type}</p>
            <h1>{type} Profile</h1> 
            {profile ? (
                <div>
                    {type === "Professional" && (
                        <div className="content">
                            {profile.SelfPicture && profile.SelfPicture !== "S3 Link" && (
                                <img src={profile.SelfPicture} alt="Profile" />
                            )}
                            <div className="bio">
                                <h2>Biography</h2>
                                <p>{profile.Biography}</p>
                            </div>
                        </div>
                    )}
                    {type === "Personal" && (
                        <div>
                            <div className="content">
                                <div className="bio">
                                    <h2>Biography</h2>
                                    <p>{profile.Biography}</p>
                                </div>
                            </div>
                            <div className="pictures-container">
                                {profile.Pictures?.Self && profile.Pictures.Self !== "S3 Link" && (
                                    <img src={profile.Pictures.Self} alt="Self" />
                                )}
                                {profile.Pictures?.Meow && profile.Pictures.Meow !== "S3 Link" && (
                                    <img src={profile.Pictures.Meow} alt="Meow" />
                                )}
                                {profile.Pictures?.Travel && profile.Pictures.Travel !== "S3 Link" && (
                                    <img src={profile.Pictures.Travel} alt="Travel" />
                                )}
                            </div>
                        </div>
                    )}
                </div>
            ) : (
                <p>No profile data found.</p>
            )}
        </div>

    );
};

export default Profile;