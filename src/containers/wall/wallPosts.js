import React, {useState, useEffect} from 'react';

import {firestore} from '../../firebase';

import {Link} from 'react-router-dom';

const WallPosts = (props) => {

  const [posts, setPosts] = useState(null);
  
  if (posts) {
    console.log(posts.length)
  } else {
    console.log(posts)
  }

  useEffect(() => {
    const postArr = [];
    firestore.collection("posts").orderBy("timestamp", "desc").get()
      .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
              // console.log(doc.id, " => ", doc.data());
              postArr.push(doc.data());
          });
          setPosts(postArr);
        }
      )
      .catch((error) => console.log(error));
  }, []);

  const postArr = posts ? posts.map(post => {
    return (<div className="p-6 bg-white mt-6 sm:mx-0 mx-2" key={post.timestamp}>
              <Link to={`/singles/profile/${post.uid}/posts`}>
              <div className=" flex items-center">
                  <img src={post.dp} className="w-20 h-20 rounded-full object-center object-cover" />
                <div className="ml-6">
                  <div className="text-gray-600 text-2xl font-bold" >{post.name}</div>
                  <div className="text-gray-400">{`Posted: ${post.date}`}</div>
                </div>
              </div>
              </Link>
              <p className="my-5 text-xl mx-2 text-gray-600">
                {post.content}
              </p>
              <figure className="mt-10">
                <img src={post.img} />
                <figcaption className="text-xl text-gray-500 mt-3 ml-1">{post.caption}</figcaption>
              </figure>
            </div>)
  }) : <h1>Loading...</h1> ;

  return (
    // <div className="p-6 bg-white mt-6">
    //         <div className=" flex items-center">
    //           <a href="#">
    //             <img src="https://us.123rf.com/450wm/iko/iko1409/iko140900116/31694000-studio-portrait-of-a-handsome-young-man-astonished-with-something.jpg?ver=6" className="w-20 h-20 rounded-full object-center object-cover" />
    //           </a>
    //           <div className="ml-6">
    //             <a className="text-gray-600 text-2xl font-bold" >Jimmy Anderson</a>
    //             <div className="text-gray-400">Posted: 2021.03.12</div>
    //           </div>
    //         </div>
    //         <p className="my-5 text-xl mx-2 text-gray-600">
    //           There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by 
    //           injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem 
    //           Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on 
    //           the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet.
    //         </p>
    //         <figure className="mt-10">
    //           <img src="https://nilaveli.tangerinehotels.com/wp-content/uploads/2016/07/hotel-facilities-thumb.jpg" className="w-11/12 post-pic-h mx-auto h-96 object-cover object-center" />
    //           <figcaption>Fig.1 - Trulli, Puglia, Italy.</figcaption>
    //         </figure>
    //       </div> 
    <main>
      {postArr}
    </main>
    )
}

export default WallPosts;