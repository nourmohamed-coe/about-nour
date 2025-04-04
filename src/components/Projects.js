import React, { useEffect, useState } from 'react';
import AWS from '../aws-config';
import { Link } from 'react-router-dom';

const Projects = ({ project }) => {
    const [projectData, setProjectData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const dynamoDb = new AWS.DynamoDB.DocumentClient();

            const params = {
                TableName: 'Projects',
                Key: {
                    ProjectName: project,
                },
            };

            try {
                const data = await dynamoDb.get(params).promise();
                if (data.Item) {
                    setProjectData(data.Item);
                } else {
                    console.error('No data found for the given key.');
                }
            } catch (error) {
                console.error('Error fetching project:', error);
            }
        };

        fetchData();
    }, [project]);

    return (
        <div className="project-container">
            <p>Projects / {projectData ? projectData.ProjectName : project}</p>
            <h1>{projectData ? projectData.ProjectName : project}</h1>
            {projectData ? (
                <div>
                    {projectData.ProjectOverview && (

                        <div>
                            <h2>Project Overview</h2>
                            <p>{projectData.ProjectOverview}</p>
                        </div>
                    )}
                    {projectData.Architecture && (
                        <div>
                            <img src={projectData.Architecture} alt="Project Architecture" />
                        </div>
                    )}
                    {projectData.TechnicalImplementation && (
                        <div>
                            <h2>Technical Implementation</h2>
                            <p>{projectData.TechnicalImplementation}</p>
                        </div>
                    )}
                    {projectData.Configurations && (
                        <div>
                            <h2>Configurations</h2>
                            <p>{projectData.Configurations}</p>
                        </div>
                    )}
                    {projectData.DataCenterCabling && (
                        <div>
                            <h2>Data Center Cabling</h2>
                            <p>{projectData.DataCenterCabling}</p>
                        </div>
                    )}
                </div>
            ) : (
                <p>No project data found.</p>
            )}
        </div>
    );
};

export default Projects;