"use client";

import Loader from "@components/Loader";
import Navbar from "@components/Navbar";
import WorkList from "@components/WorkList";
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import React, { Suspense, useEffect, useState } from "react";
import "@styles/Shop.scss";

// Component to fetch and display shop content
const ShopContent = () => {
  const { data: session } = useSession();
  const loggedInUserId = session?.user?._id;

  const searchParams = useSearchParams();
  const profileId = searchParams.get("id");

  const [workList, setWorkList] = useState([]);
  const [profile, setProfile] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getWorkList = async () => {
      if (!profileId) return;

      try {
        const response = await fetch(`api/user/${profileId}/shop`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const data = await response.json();
        setWorkList(data.workList);
        setProfile(data.user);
      } catch (error) {
        console.error("Error fetching work list:", error);
      } finally {
        setLoading(false);
      }
    };

    getWorkList();
  }, [profileId]);

  if (loading) return <Loader />;

  return (
    <>
      {loggedInUserId === profileId && (
  <h1 className="title-list">Your Works</h1>
)}

{loggedInUserId !== profileId && (
  <h1 className="title-list">{profile.username}'s Works</h1>
)}

      <WorkList data={workList} />
    </>
  );
};

// Main component wrapping ShopContent with Suspense
const Shop = () => {
  return (
    <>
      <Navbar />
      <Suspense fallback={<Loader />}>
        <ShopContent />
      </Suspense>
    </>
  );
};

export default Shop;


