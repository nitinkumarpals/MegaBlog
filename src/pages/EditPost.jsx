import React, { useEffect, useState } from "react";
import {Container , PostForm} from '../components';
import appwriteService from "../appwrite/config";
import { useParams, useNavigate } from "react-router-dom";


function EditPost() {
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
          try {
            if (slug) {
              const postResult = await appwriteService.getPost(slug);
              if (postResult) {
                setPost(postResult);
              }
            } else {
              navigate('/');
            }
          } catch (error) {
            console.error('Error fetching post:', error);
          }
        };
    
        fetchData();
      }, [slug, navigate]);

  return post ? (
    <div className="py-8">
        <Container>
            <PostForm post={post} />
        </Container>
    </div>
  ) : null
}

export default EditPost
