import React, {useEffect} from 'react';

const Posts = (props) => {

  const userPosts = props.posts ? props.posts.map(post => {
    return (<div className="p-6 bg-white mt-6" key={post.timestamp}>
              <div className=" flex items-center">
                <a href="#">
                  <img src={post.dp} className="w-20 h-20 rounded-full object-center object-cover" />
                </a>
                <div className="ml-6">
                  <a className="text-gray-600 text-2xl font-bold" >{post.name}</a>
                  <div className="text-gray-400">{`Posted: ${post.date}`}</div>
                </div>
              </div>
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
    <>
    {userPosts}
    </>
  )
}

export default Posts;