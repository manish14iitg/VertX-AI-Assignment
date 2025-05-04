import React, { useEffect, useState } from "react";
import { useAppStore } from "../../store/store";
import SideBar from "../../components/SideBar";
import Header from "../../components/Header";
import apiClient from "../../lib/apiClient";
import { Pagination, message } from "antd";
function Dashboard() {
  const { userInfo } = useAppStore();
  const [posts, setPosts] = useState([]);
  const [currentSource, setCurrentSource] = useState("reddit");
  const [page, setPage] = useState(1);
  const [totalPosts, setTotalPosts] = useState(0);
  const [limit, setLimit] = useState(8);
  const [credits, setCredits] = useState(userInfo?.credits || 0);

  const fetchPosts = async (source, page = 1) => {
    try {
      const res = await apiClient.get(
        `api/posts/${source}?page=${page}&limit=${limit}`
      );
      console.log("response", res);
      setPosts(res.data.posts);
      setTotalPosts(res.data.totalPosts);
    } catch (error) {
      message.error("Failed to fetch posts!");
    }
  };

  useEffect(() => {
    fetchPosts(currentSource, page);
  }, [currentSource, page, limit]);

  const handlePaginationChange = (page) => {
    setPage(page);
    fetchPosts(currentSource, page);
  };

  const truncateText = (text, maxLength = 100) => {
    if (text && text.length > maxLength) {
      return text.substring(0, maxLength) + "...";
    }
    return text;
  };

  const handleSave = async (postId) => {
    try {
      const { data } = await apiClient.post("api/posts/save-post", {
        userId: userInfo._id,
        postId: postId,
      });
      setCredits(userInfo.credits);
      await fetchPosts(currentSource, page, false);
    } catch (e) {
      message.error("Something went wrong while saving the post!");
    }
  };

  const handleReport = async (postId) => {
    try {
      const { data } = await apiClient.post("api/posts/report-post", {
        userId: userInfo._id,
        postId: postId,
      });

      await fetchPosts(currentSource, page, false);
    } catch (e) {
      message.error("Something went wrong while reporting the post!");
    }
  };
  return (
    <div className="flex flex-col relative h-screen">
      <div className="flex ">
        <div className="w-64 flex-shrink-0 h-full sticky top-0">
          <SideBar type="dashboard" className="sticky" />
        </div>
        <div className="flex flex-col flex-1">
          <Header
            credits={credits}
            setCredits={setCredits}
            className="w-full"
          />

          <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {posts.map((post) => {
              const data = post.data || post;
              return (
                <div
                  key={post._id}
                  className="bg-white rounded-2xl shadow-lg p-4 flex flex-col justify-between border hover:shadow-xl transition duration-300"
                >
                  {data.thumbnail ? (
                    data.thumbnail !== "self" && (
                      <img
                        src={data.thumbnail}
                        alt="thumbnail"
                        className="rounded-xl w-full h-40 object-cover mb-3"
                      />
                    )
                  ) : (
                    <div className="h-40 w-full rounded-xl mb-3"></div>
                  )}
                  <div className="mb-3">
                    <div className="flex items-center justify-between">
                      <a
                        href={`https://www.reddit.com${data.permalink}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-base font-semibold text-gray-800 hover:text-blue-600 transition line-clamp-2"
                        title="View post on Reddit"
                      >
                        {truncateText(data.title || "No title", 80)}
                      </a>
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(
                            `https://www.reddit.com${data.permalink}`
                          );
                          message.success("Link copied to clipboard!");
                        }}
                        className="ml-2 text-xs text-gray-500 hover:text-blue-500 transition"
                        title="Copy post link"
                      >
                        Copy
                      </button>
                    </div>
                  </div>
                  <p className="text-sm text-gray-700 mb-3 line-clamp-3">
                    {truncateText(
                      data.selftext || data.description || data.content
                    )}
                  </p>
                  <div className="flex justify-between gap-2 mt-auto">
                    <button
                      onClick={() => handleSave(post._id)}
                      className="text-sm px-3 py-1 rounded-full bg-green-100 text-green-700 hover:bg-green-200 transition"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => handleReport(post._id)}
                      className="text-sm px-3 py-1 rounded-full bg-red-100 text-red-700 hover:bg-red-200 transition"
                    >
                      Report
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>{" "}
      </div>
      {totalPosts > limit && (
        <div className="flex justify-center">
          <Pagination
            current={page}
            pageSize={limit}
            total={totalPosts}
            onChange={handlePaginationChange}
            showSizeChanger={false}
          />
        </div>
      )}
    </div>
  );
}

export default Dashboard;
