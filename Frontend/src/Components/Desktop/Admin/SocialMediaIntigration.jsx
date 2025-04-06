import { Download, Plus } from "lucide-react";
import React, { useState } from "react";
import Table from "../../Common/Tabel";
import ActionSocialMediaInti from "./ActionSocialMediaInti";

const SocialMediaIntigration = () => {
  const [isAdding, setIsAdding] = useState(false);

  const handleAddClick = () => {
    setIsAdding(true);
  };

  const handleCancel = () => {
    setIsAdding(false); // Set to false to show the Table component again
  };

  const UserRoleHeaders = [
    "Platform Name",
    "Share Link",
    "Post Title",
    "Action",
  ];
  const userData = [
    {
      "Platform Name": "Facebook",
      "Share Link": "https://facebook.com/post/1",
      "Post Title": "How to Stay Productive at Work",
      Action: "Edit",
    },
    {
      "Platform Name": "Instagram",
      "Share Link": "https://instagram.com/p/2",
      "Post Title": "Sunset Photography Tips",
      Action: "Edit",
    },
    {
      "Platform Name": "Twitter",
      "Share Link": "https://twitter.com/status/3",
      "Post Title": "Breaking News Update",
      Action: "Edit",
    },
    {
      "Platform Name": "LinkedIn",
      "Share Link": "https://linkedin.com/post/4",
      "Post Title": "Job Hunting Strategies",
      Action: "Edit",
    },
    {
      "Platform Name": "YouTube",
      "Share Link": "https://youtube.com/watch?v=5",
      "Post Title": "Learn JavaScript in 10 Minutes",
      Action: "Edit",
    },
    {
      "Platform Name": "Pinterest",
      "Share Link": "https://pinterest.com/pin/6",
      "Post Title": "Creative DIY Home Decor",
      Action: "Edit",
    },
    {
      "Platform Name": "Reddit",
      "Share Link": "https://reddit.com/r/topic/7",
      "Post Title": "Latest Movie Discussions",
      Action: "Edit",
    },
    {
      "Platform Name": "TikTok",
      "Share Link": "https://tiktok.com/@user/8",
      "Post Title": "Dance Challenge: Try This!",
      Action: "Edit",
    },
    {
      "Platform Name": "Medium",
      "Share Link": "https://medium.com/article/9",
      "Post Title": "How to Start Blogging",
      Action: "Edit",
    },
    {
      "Platform Name": "Snapchat",
      "Share Link": "https://snapchat.com/story/10",
      "Post Title": "Behind the Scenes with Creators",
      Action: "Edit",
    },
    {
      "Platform Name": "Tumblr",
      "Share Link": "https://tumblr.com/post/11",
      "Post Title": "Aesthetic Design Inspirations",
      Action: "Edit",
    },
    {
      "Platform Name": "Quora",
      "Share Link": "https://quora.com/answer/12",
      "Post Title": "Best Travel Destinations 2024",
      Action: "Edit",
    },
    {
      "Platform Name": "Facebook",
      "Share Link": "https://facebook.com/post/13",
      "Post Title": "Healthy Eating Tips",
      Action: "Edit",
    },
    {
      "Platform Name": "Instagram",
      "Share Link": "https://instagram.com/p/14",
      "Post Title": "Pet Photography Ideas",
      Action: "Edit",
    },
    {
      "Platform Name": "Twitter",
      "Share Link": "https://twitter.com/status/15",
      "Post Title": "Event Highlights of the Day",
      Action: "Edit",
    },
    {
      "Platform Name": "LinkedIn",
      "Share Link": "https://linkedin.com/post/16",
      "Post Title": "Resume Building Tips",
      Action: "Edit",
    },
    {
      "Platform Name": "YouTube",
      "Share Link": "https://youtube.com/watch?v=17",
      "Post Title": "Best Gadgets of 2024",
      Action: "Edit",
    },
    {
      "Platform Name": "Pinterest",
      "Share Link": "https://pinterest.com/pin/18",
      "Post Title": "Holiday Craft Ideas",
      Action: "Edit",
    },
    {
      "Platform Name": "Reddit",
      "Share Link": "https://reddit.com/r/topic/19",
      "Post Title": "Tech Reviews and Discussions",
      Action: "Edit",
    },
    {
      "Platform Name": "TikTok",
      "Share Link": "https://tiktok.com/@user/20",
      "Post Title": "Funny Skits Compilation",
      Action: "Edit",
    },
    {
      "Platform Name": "Medium",
      "Share Link": "https://medium.com/article/21",
      "Post Title": "Productivity Hacks for Students",
      Action: "Edit",
    },
    {
      "Platform Name": "Snapchat",
      "Share Link": "https://snapchat.com/story/22",
      "Post Title": "Daily Life Vlogs",
      Action: "Edit",
    },
    {
      "Platform Name": "Tumblr",
      "Share Link": "https://tumblr.com/post/23",
      "Post Title": "Vintage Fashion Trends",
      Action: "Edit",
    },
    {
      "Platform Name": "Quora",
      "Share Link": "https://quora.com/answer/24",
      "Post Title": "How to Learn New Languages",
      Action: "Edit",
    },
    {
      "Platform Name": "Facebook",
      "Share Link": "https://facebook.com/post/25",
      "Post Title": "Morning Yoga Routine",
      Action: "Edit",
    },
    {
      "Platform Name": "Instagram",
      "Share Link": "https://instagram.com/p/26",
      "Post Title": "Travel Diaries: Exploring Italy",
      Action: "Edit",
    },
    {
      "Platform Name": "Twitter",
      "Share Link": "https://twitter.com/status/27",
      "Post Title": "Tech Conference Highlights",
      Action: "Edit",
    },
    {
      "Platform Name": "LinkedIn",
      "Share Link": "https://linkedin.com/post/28",
      "Post Title": "Tips for Remote Work Success",
      Action: "Edit",
    },
    {
      "Platform Name": "YouTube",
      "Share Link": "https://youtube.com/watch?v=29",
      "Post Title": "Top 5 Fitness Exercises",
      Action: "Edit",
    },
    {
      "Platform Name": "Pinterest",
      "Share Link": "https://pinterest.com/pin/30",
      "Post Title": "Minimalist Interior Design",
      Action: "Edit",
    },
  ];

  return (
    <>
      {isAdding ? (
        <ActionSocialMediaInti onCancle={handleCancel} />
      ) : (
        <div>
          <h2 className="text-[40px] font-medium">Social Media Integration</h2>
          <div className="pb-[15px] pt-[18px] bg-white sticky top-[50px] flex justify-between border-b ">
            <div>
              <p className="text-bold text-[18px] font-bold">
                All Social Media Post
              </p>
              {/* <p className="font-normal text-[14px] font-[#64748B]">
            The Manage Users & Roles page enables admins to efficiently view,
            update roles, and delete user accounts
          </p> */}
            </div>
            <div className="flex gap-2">
              <p
                className="bg-[#4880FF] px-[10px] py-[4px] rounded-[8px] text-white font-semibold cursor-pointer flex gap-2 items-center text-[13px]"
                onClick={handleAddClick}
              >
                <Plus size={16} strokeWidth={1.5} absoluteStrokeWidth />
                Add
              </p>
              <p className="border px-[16px] py-[8px] rounded-[8px]  font-semibold flex gap-2 items-center text-[14px] cursor-pointer">
                <Download size={16} strokeWidth={1.5} absoluteStrokeWidth />
                Download PDF Report
              </p>
            </div>
          </div>
          <div className="mt-5 ">
            <Table headers={UserRoleHeaders} data={userData} />
          </div>
        </div>
      )}
    </>
  );
};

export default SocialMediaIntigration;
