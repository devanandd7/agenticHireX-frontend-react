import React from 'react';

// Data for each card
const cardData = [
  {
    id: 1,
    imgSrc: "http://1.bp.blogspot.com/-tso_pF4jEdU/UPC4zDXEY6I/AAAAAAAAAhE/Vb2Cd8nRZEo/s1600/a.jpg",
    avatarSrc: "https://a1cf74336522e87f135f-2f21ace9a6cf0052456644b80fa06d4f.ssl.cf2.rackcdn.com/images/characters/p-avatar-sam-worthington.jpg",
    cardBackImgSrc: "https://i.pinimg.com/564x/1e/7e/4d/1e7e4d11c01e57f32410ece8c1961646.jpg",
    title: "Jake Sully",
    subTitle: "@Na'vi_4_Lyf",
    bio: "Sick of doctors telling me what I couldn't do. I was a marine. A warrior... of the uh... Jarhead Clan. My cup is empty."
  },
  {
    id: 2,
    imgSrc: "https://orig00.deviantart.net/db12/f/2012/038/5/0/blood_splatter_background_by_pudgey77-d4ozy89.jpg",
    avatarSrc: "https://66.media.tumblr.com/3d3f6bb97ca2507b4aa679c205b7ae4d/tumblr_pitd3ejkzw1wcgykbo1_640.jpg",
    cardBackImgSrc: "https://i.pinimg.com/736x/b1/2d/9f/b12d9f259a178fc9dc7bfb6447be7a1c.jpg",
    title: "John Wick",
    subTitle: "@HighOctane",
    bio: "People keep asking if I'm back and I haven't really had an answer. But now, yeah, I'm thinkin' I'm back."
  },
  {
    id: 3,
    imgSrc: "https://wallpaperaccess.com/full/279729.jpg",
    avatarSrc: "https://i.pinimg.com/originals/74/4d/b3/744db3fd9842133829be6e0182c3d62d.jpg",
    cardBackImgSrc: "https://pre00.deviantart.net/0274/th/pre/i/2014/357/0/d/guardians_of_the_galaxy___groot_poster__acrylic__by_cybergal2013-d8aydlf.jpg",
    title: "Groot",
    subTitle: "@iAmGroot",
    bio: "I am Groot. I am Groot... I am Groot, I am Groot, I am Groot I am Groot. I am Groot. I am Groot. I am Groot."
  },
  {
    id: 4,
    imgSrc: "https://media.giphy.com/media/Y6pDMTysYTQ2I/giphy.gif",
    avatarSrc: "https://66.media.tumblr.com/dcf6558ccad075ce4cca03cc1d972f97/tumblr_phhrt8PrRE1tc5gvpo4_250.png",
    cardBackImgSrc: "https://i.pinimg.com/564x/22/f1/3e/22f13ea035bc11beeeb1349550fb3170.jpg",
    title: "Mindy Mcready",
    subTitle: "@HitGirl",
    bio: "I can't see through walls but I can kick your ass. I think some tasers look gay. Robin wishes he was me."
  }
];

// Card Component (Functional Component)
const Card = ({ imgSrc, avatarSrc, cardBackImgSrc, title, subTitle, bio }) => {
  return (
    <div className="flipperContainer">
      <div className="flipper">
        <div className="cardFront cardContainer">
          <div className="imgContainer">
            <img
              src={imgSrc}
              className="img"
              alt="Card background"
              onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/300x175/444444/ffffff?text=Image+Error"; }}
            />
          </div>
          <div className="avatarContainer infoContainer">
            <img
              src={avatarSrc}
              className="avatarImg"
              alt="Avatar"
              onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/150x150/000000/ffffff?text=Avatar+Error"; }}
            />
          </div>
          <div className="titleDiv">
            <h1 className="title">{title}</h1>
            <h4 className="subTitle">{subTitle}</h4>
          </div>
          <div className="bioContainer">
            <p className="bio">{bio}</p>
          </div>
          <div className="iconContainer">
            <span className="icons"><i className="fab fa-facebook-square"></i></span>
            <span className="icons"><i className="fab fa-youtube-square"></i></span>
            <span className="icons"><i className="fab fa-twitter-square"></i></span>
          </div>
        </div>
        <div className="cardBack">
          <img
            className="cardBackImg"
            src={cardBackImgSrc}
            alt="Card back background"
            onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/300x500/999999/ffffff?text=Back+Image+Error"; }}
          />
          <p className="madeBy">@AdamTheWizard</p>
        </div>
      </div>
    </div>
  );
};

// Main App Component
const App = () => {
  return (
    <div className="app-body">
      {/* Import Google Fonts */}
      <link href="https://fonts.googleapis.com/css?family=Raleway:400,400i,700" rel="stylesheet" />
      {/* Import Font Awesome for icons */}
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css" />

      {/* Custom CSS styles */}
      <style>
        {`
        .app-body {
          background: linear-gradient(to bottom right, #ff5555 40%, #5555ff 100%);
          width: 100%;
          min-height: 100vh;
          overflow-x: hidden;
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 20px;
          box-sizing: border-box;
        }
        * {
          font-family: 'Raleway', sans-serif;
          box-sizing: border-box;
        }
        .header {
          text-align: center;
          color: #fff;
          margin-top: 50px;
          margin-bottom: 30px;
          font-size: 3em;
        }
        .flex {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 40px;
          max-width: 1300px;
          width: 100%;
          margin: 0 auto;
        }
        .flipperContainer {
          border-radius: 35px;
          perspective: 1000px;
          width: 300px;
          height: 500px;
          position: relative;
          margin: 0;
        }
        .flipperContainer:hover .flipper {
          transform: rotateY(180deg);
        }
        .flipper {
          transition: 1s;
          transform-style: preserve-3d;
          border-radius: 35px;
          position: absolute;
          top: 0;
          bottom: 0;
          left: 0;
          right: 0;
          margin: auto;
        }
        .cardFront, .cardBack {
          width: 100%;
          height: 100%;
          position: absolute;
          top: 0;
          left: 0;
          backface-visibility: hidden;
          border-radius: 35px;
          overflow: hidden;
        }
        .cardFront {
          z-index: 99;
          transform: rotateY(0deg);
          background: #fff;
          box-shadow: 1px 1px 35px #444;
        }
        .cardBack {
          transform: rotateY(180deg);
          background-color: #fff;
          box-shadow: 1px 1px 35px #444;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          align-items: center;
          padding-bottom: 20px;
        }
        .imgContainer {
          background-color: #444;
          height: 35%;
          margin: 0;
          border-top-right-radius: 35px;
          border-top-left-radius: 35px;
          background-size: cover;
          position: relative;
        }
        .imgContainer img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-top-right-radius: 35px;
          border-top-left-radius: 35px;
        }
        .avatarContainer {
          width: 150px;
          height: 150px;
          z-index: 9;
          position: relative;
          top: -85px;
          left: 0;
          right: 0;
          margin: 0 auto;
          border: 10px solid #fff;
          background: #000;
          background-size: cover;
          display: inline-block;
          text-align: center;
          border-radius: 50%;
          overflow: hidden;
        }
        .avatarContainer img {
          width: 100%;
          height: 100%;
          position: absolute;
          top: 0;
          bottom: 0;
          left: 0;
          right: 0;
          margin: auto;
          border-radius: 50%;
          object-fit: cover;
        }
        .titleDiv {
          color: #555;
          font-weight: 100;
          outline: none;
          margin: 0px;
          display: inline-block;
          width: 100%;
          text-align: center;
          position: relative;
          top: -75px;
        }
        .title {
          margin: 0;
        }
        .subTitle {
          position: relative;
          top: -20px;
          text-align: center;
          font-weight: 100;
          color: #888;
          margin: 0;
        }
        .bioContainer {
          position: relative;
          top: -95px;
        }
        .bio {
          color: #444;
          padding: 0 30px;
          text-align: center;
          margin: 0;
        }
        .iconContainer {
          position: relative;
          top: -85px;
          text-align: center;
        }
        .icons {
          margin: 0 10px;
          color: #5C6BC0;
          font-size: 24px;
        }
        .cardBackImg {
          height: 100%;
          width: 100%;
          border-radius: 35px;
          position: absolute;
          top: 0;
          left: 0;
          object-fit: cover;
          z-index: 1;
        }
        .madeBy {
          color: #fff;
          opacity: 0.8;
          text-align: center;
          padding: 0px;
          position: relative;
          z-index: 2;
        }

        /* Responsive adjustments */
        @media (max-width: 768px) {
          .flipperContainer {
            width: 280px;
            height: 470px;
          }
          .header {
            font-size: 2.5em;
          }
          .flex {
            gap: 30px;
          }
        }

        @media (max-width: 480px) {
          .flipperContainer {
            width: 90%;
            max-width: 300px;
            height: auto;
            aspect-ratio: 3/5;
          }
          .avatarContainer {
            width: 120px;
            height: 120px;
            top: -60px;
          }
          .titleDiv {
            top: -50px;
          }
          .subTitle {
            top: -10px;
          }
          .bioContainer {
            top: -60px;
          }
          .iconContainer {
            top: -50px;
          }
          .bio {
            padding: 0 15px;
          }
        }
        `}
      </style>

      <h1 className="header">Hover to flip</h1>
      <div className="flex">
        {cardData.map((card) => (
          <Card
            key={card.id}
            imgSrc={card.imgSrc}
            avatarSrc={card.avatarSrc}
            cardBackImgSrc={card.cardBackImgSrc}
            title={card.title}
            subTitle={card.subTitle}
            bio={card.bio}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
