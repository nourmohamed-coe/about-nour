import React, { useEffect, useState } from 'react';
import AWS from '../aws-config';

const Education = () => {
  const [education, setEducation] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const dynamoDb = new AWS.DynamoDB.DocumentClient();

      const params = {
        TableName: 'Education',
        Key: {
          School: 'New Jersey Institute of Technology',
        },
      };

      try {
        const data = await dynamoDb.get(params).promise();
        console.log('Fetched education data:', data.Item);
        if (data.Item) {
          setEducation(data.Item);
        } else {
          console.error('No education data found.');
        }
      } catch (error) {
        console.error('Error fetching education data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="education-container">
      <h3>Education</h3>
      {education ? (
        <div>
          <h1>{education.School}</h1>
          <h2>
            {education.Major} Major with a Concentration in {education.Concentration}, and a {education.Minor} Minor
          </h2>
          <h3>{education.Dates}</h3>
          <div className="degree-image">
            <img src={education.Degree} alt="Degree" />
          </div>
          <div className="highlights">
            <p>{education.Highlights}</p>
          </div>
        </div>
      ) : (
        <p>No education data found.</p>
      )}
    </div>


  );
};
export default Education;