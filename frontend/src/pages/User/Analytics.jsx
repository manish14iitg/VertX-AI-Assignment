import React, { useEffect, useState } from "react";
import SideBar from "../../components/SideBar";
import Header from "../../components/Header";
import { useAppStore } from "../../store/store";
import apiClient from "../../lib/apiClient";

function Analytics() {
  const { userInfo } = useAppStore();
  const [credits, setCredits] = useState(userInfo?.credits);
  const [posts, setPosts] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalPosts, setTotalPosts] = useState(0);
  const [totalSavedPosts, setTotalSavedPosts] = useState(0);
  const [totalReportedPosts, setTotalReportedPosts] = useState(0);
  const [activities, setActivities] = useState([]);

  const fetchSavedPosts = async () => {
    try {
      const res = await apiClient.get(`api/posts/saved-posts`);
      console.log("response", res);
      setPosts(res.data.posts);
    } catch (error) {
      console.log(error.message);
    }
  };

  const getActivities = async () => {
    try {
      const response = await apiClient.get(`api/activity/user/${userInfo._id}`);

      console.log("activities", response);
      setActivities(response.data);
    } catch (error) {
      console.log("error getting activities.");
    }
  };

  useEffect(() => {
    fetchSavedPosts();
    getAdminAnalytics();
    getActivities();
  }, []);

  const getAdminAnalytics = async () => {
    try {
      const response = await apiClient.get("api/admin/analytics");
      console.log("response", response);
      setTotalPosts(response.data.totalPosts);
      setTotalSavedPosts(response.data.totalSavedPosts);
      setTotalReportedPosts(response.data.totalReportedPosts);
      setTotalUsers(response.data.totalUsers);
    } catch (error) {
      console.log("error in getting analytics.");
    }
  };

  return (
    <div className="flex flex-col relative h-screen">
      {userInfo?.role == "user" && (
        <div className="flex ">
          <div className="w-64 flex-shrink-0 h-full sticky top-0">
            <SideBar type={"user-analytics"} className="sticky" />
          </div>
          <div className="flex flex-col flex-1">
            <Header
              setCredits={setCredits}
              credits={credits}
              className="w-full"
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
              {/* Card 1 */}
              <div className="bg-white rounded-xl shadow-md p-4 border border-gray-200">
                <h2 className="text-lg font-semibold text-gray-800 mb-2">
                  Today's Login Credit
                </h2>
                <p className="text-2xl font-bold text-blue-600">Yes</p>
                <p className="text-sm text-gray-500 mt-1">Come Back Tomorrow</p>
              </div>

              {/* Card 2 */}
              <div className="bg-white rounded-xl shadow-md p-4 border border-gray-200">
                <h2 className="text-lg font-semibold text-gray-800 mb-2">
                  Total Credits
                </h2>
                <p className="text-2xl font-bold text-green-600">{credits}</p>
                <p className="text-sm text-gray-500 mt-1">
                  Explore more to earn.
                </p>
              </div>

              {/* Card 3 */}
              <div className="bg-white rounded-xl shadow-md p-4 border border-gray-200">
                <h2 className="text-lg font-semibold text-gray-800 mb-2">
                  User Role
                </h2>
                <p className="text-2xl font-bold text-purple-600">
                  {userInfo.role}
                </p>
              </div>
              {/* Card 4 */}
              <div className="bg-white rounded-xl shadow-md p-4 border border-gray-200">
                <h2 className="text-lg font-semibold text-gray-800 mb-2">
                  Total Saved Posts
                </h2>
                <p className="text-2xl font-bold text-purple-600">
                  {userInfo.savedPosts.length}
                </p>
              </div>
              {/* Card 3 */}
              <div className="bg-white rounded-xl shadow-md p-4 border border-gray-200">
                <h2 className="text-lg font-semibold text-gray-800 mb-2">
                  Total Reported Posts
                </h2>
                <p className="text-2xl font-bold text-purple-600">
                  {userInfo.reportedPosts.length}
                </p>
              </div>
            </div>

            <div className="p-4 bg-white shadow rounded">
              <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
              {activities.length === 0 ? (
                <p>No recent activities.</p>
              ) : (
                <ul className="space-y-2">
                  {activities.map((activity) => (
                    <li key={activity._id} className="border-b pb-2">
                      <div>
                        <strong>Action:</strong> {activity.details}
                      </div>
                      {activity.postId && (
                        <div>
                          <strong>Post:</strong> {activity.postId.title}
                        </div>
                      )}
                      <div className="text-sm text-gray-500">
                        {new Date(activity.timestamp).toLocaleString()}
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      )}
      {userInfo?.role == "admin" && (
        <div>
          <div className="flex ">
            <div className="w-64 flex-shrink-0 h-full sticky top-0">
              <SideBar type="admin" className="sticky" />
            </div>
            <div className="flex flex-col flex-1">
              <Header
                setCredits={setCredits}
                credits={null}
                className="w-full"
              />

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
                {/* Card 1 */}
                <div className="bg-white rounded-xl shadow-md p-4 border border-gray-200">
                  <h2 className="text-lg font-semibold text-gray-800 mb-2">
                    Total Users
                  </h2>
                  <p className="text-2xl font-bold text-blue-600">
                    {totalUsers}
                  </p>
                </div>

                {/* Card 2 */}
                <div className="bg-white rounded-xl shadow-md p-4 border border-gray-200">
                  <h2 className="text-lg font-semibold text-gray-800 mb-2">
                    Total Posts
                  </h2>
                  <p className="text-2xl font-bold text-green-600">
                    {totalPosts}
                  </p>
                </div>

                {/* Card 3 */}
                <div className="bg-white rounded-xl shadow-md p-4 border border-gray-200">
                  <h2 className="text-lg font-semibold text-gray-800 mb-2">
                    Total Saved Posts
                  </h2>
                  <p className="text-2xl font-bold text-purple-600">
                    {totalSavedPosts}
                  </p>
                </div>
                {/* Card 4 */}
                <div className="bg-white rounded-xl shadow-md p-4 border border-gray-200">
                  <h2 className="text-lg font-semibold text-gray-800 mb-2">
                    Total Reported Posts
                  </h2>
                  <p className="text-2xl font-bold text-purple-600">
                    {totalReportedPosts}
                  </p>
                </div>
              </div>

              <div className="p-4 bg-white shadow rounded">
                <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
                {activities.length === 0 ? (
                  <p>No recent activities.</p>
                ) : (
                  <ul className="space-y-2">
                    {activities.map((activity) => (
                      <li key={activity._id} className="border-b pb-2">
                        <div>
                          <strong>Action:</strong> {activity.details}
                        </div>
                        {activity.postId && (
                          <div>
                            <strong>Post:</strong> {activity.postId.title}
                          </div>
                        )}
                        <div className="text-sm text-gray-500">
                          {new Date(activity.timestamp).toLocaleString()}
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Analytics;
