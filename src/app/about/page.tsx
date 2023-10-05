// pages/about.js

import React from 'react';

// Inline styles for the TeamMember component
const teamMemberStyles = {
  teamMember: {
    textAlign: 'center',
    marginBottom: '20px',
  },
  image: {
    width: '150px',
    height: '150px',
    borderRadius: '50%',
    objectFit: 'cover',
    marginBottom: '10px',
  },
};

const TeamMember = ({ name, role, imageUrl }) => (

<div style={teamMemberStyles.teamMember}>

    <img src={imageUrl} alt={name} style={teamMemberStyles.image} />

    <h3>{name}</h3>
    <p>{role}</p>
  </div>
);

const About = () => {
  const teamMembers = [
    {
      name: 'John Doe',
      role: 'Founder',
      imageUrl: '/poza/bla.jpeg', // Replace with the actual image URL
    },
    {
      name: 'Jane Smith',
      role: 'Lead Developer',
      imageUrl: '/poza/bla.jpeg', // Replace with the actual image URL
    },
    {
      name: 'Alice Johnson',
      role: 'Designer',
      imageUrl: '/poza/bla.jpeg', // Replace with the actual image URL
    },
  ];

  return (
<center>

    <div>
      <h1>Edu-Fitcare+</h1>
      <p>Moderators</p>
      <h2>Here you have the full list of Edu-Fitcare+ Moderators!</h2>
      <center>
      <div className="team-members">
        {teamMembers.map((member, index) => (
          <TeamMember
            key={index}
            name={member.name}
            role={member.role}
            imageUrl={member.imageUrl}
          />
        ))}
      </div>
      </center>
    </div>
    </center>
  );
};

export default About;
