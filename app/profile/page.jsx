"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Profile from "@components/Profile";

const MyProfile = () => {
  const { data: session } = useSession();

  const [post, setPost] = useState([]);

  const router = useRouter();

  const fetchPosts = async () => {
    const response = await fetch(`/api/users/${session?.user.id}/posts`);
    const data = await response.json();

    setPost(data);
  };

  useEffect(() => {
    if (session?.user.id) {
      fetchPosts();
    }
  }, []);

  const handleEdit = (post) => {
    router.push(`/update-prompt?id=${post._id}`);
  };
  const handleDelete = async (postParam) => {
    const isConfirmed = confirm(
      "Are you sure that you want to delete this prompt"
    );

    if (isConfirmed) {
      try {
        await fetch(`/api/prompt/${postParam._id}`, {
          method: "DELETE",
        });
        const filteredPosts = post.filter((p) => p._id !== postParam.id);
        console.log(filteredPosts);

        setPost(filteredPosts);
      } catch (error) {
        alert(error.message);
      }
    }

    router.refresh();
  };
  if (!session) {
    return <p>Not allowed</p>;
  }
  return (
    <Profile
      handleEdit={handleEdit}
      handleDelete={handleDelete}
      desc="Welcome to your personalized profile page"
      data={post}
      name={"My"}
    />
  );
};

export default MyProfile;
