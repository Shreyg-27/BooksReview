// import React, { useState, useEffect } from 'react';
// import { useNavigate, useParams } from 'react-router-dom';

// const ReadMyArticles = () => {
//     const { userId } = useParams();
//     const navigate = useNavigate();
//     const [articles, setArticles] = useState([]);

//     useEffect(() => {
//         console.log(userId);
//         const fetchUserPosts = async () => {
//             try {
//                 const response = await fetch(`http://localhost:5000/user/${userId}/posts`);
//                 if (response.ok) {
//                     const data = await response.json();
//                     setArticles(data);
//                 } else {
//                     console.error('Failed to fetch user articles');
//                 }
//             } catch (error) {
//                 console.error('Error fetching user articles:', error);
//             }
//         };

//         fetchUserPosts();
//     }, [userId]);

//     return (
//         <div>
//             <h1>My Articles</h1>
//             <ul>
//                 {articles.map(article => (
//                     <li key={article._id}>
//                         <h2>{article.title}</h2>
//                         <p>{article.article}</p>
//                         <p>Tags: {article.tags.join(', ')}</p>
//                     </li>
//                 ))}
//             </ul>
//             <button onClick={() => navigate('/createPost')}>Create Article</button>
//             <button onClick={() => navigate('/')}>Logout</button>
//         </div>
//     );
// };

// export default ReadMyArticles;

