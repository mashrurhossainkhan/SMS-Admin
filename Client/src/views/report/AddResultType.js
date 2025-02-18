import React, { useState, useEffect } from "react";
import axios from "axios";
import { API } from "../../actions/api"; // Ensure API base URL is correctly defined
import { TheSidebar } from "../../containers";

const AddResultType = () => {
  const [type, setType] = useState("");
  const [message, setMessage] = useState("");
  const [resultTypes, setResultTypes] = useState([]);

  // Fetch all result types
  useEffect(() => {
    fetchResultTypes();
  }, []);

  const fetchResultTypes = async () => {
    try {
      const response = await axios.get(`${API}/api/get/all/result/types`);

      console.log(response.data.data)
      
      // Ensure response is an array
      setResultTypes(Array.isArray(response.data.data) ? response.data.data : []);
    } catch (error) {
      console.error("Error fetching result types:", error);
      setResultTypes([]); // Fallback to an empty array on error
    }
  };
  

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    if (!type.trim()) {
      setMessage("Result type is required.");
      return;
    }

    try {
      await axios.post(`${API}/api/add/result/type`, { type });
      alert("✅ Result type added successfully!");
      setType(""); 
      fetchResultTypes();
    } catch (error) {
      console.error("Error:", error);
      setMessage("❌ Server error. Please try again.");
    }
  };

  // Handle delete action
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this result type?")) return;

    try {
      await axios.delete(`${API}/api/delete/result/type/${id}`);
      alert("❌ Result type deleted successfully!");
      fetchResultTypes(); // Refresh the list
    } catch (error) {
      console.error("Error deleting result type:", error);
      alert("❌ Failed to delete result type.");
    }
  };

  return (
    <>
      <TheSidebar />
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
        {/* Add Result Type Form */}
        <div style={{display: "flex", justifyContent: "center", paddingTop: "50px"}} className="bg-white p-6 rounded-lg shadow-lg w-96 mb-6">
          <h2 className="text-2xl font-bold text-center mb-4">Add Result Type</h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter result type..."
              value={type}
              onChange={(e) => setType(e.target.value)}
            />
            <button
              type="submit"
              className="w-full bg-blue-500 py-2 rounded-lg hover:bg-blue-600 transition"
            >
              Submit
            </button>
          </form>
        </div>

        {/* Result Types Table */}
        <h2 style={{display: "flex", justifyContent: "center", paddingTop: "50px"}}  className="text-2xl font-bold text-center mb-4">Result Types</h2>
        <div style={{display: "flex", justifyContent: "center", paddingTop: "50px"}} className="w-full max-w-3xl bg-white p-6 rounded-lg shadow-lg">
          
          {resultTypes.length === 0 ? (
            <p className="text-center text-gray-500">No result types found.</p>
          ) : (
            <table className="w-full border-collapse border border-gray-300 bg-white shadow-lg">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border p-3">ID</th>
                  <th className="border p-3">Type</th>
                  <th className="border p-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {resultTypes.map((resultType) => (
                  <tr key={resultType.id} className="text-center">
                    <td className="border p-3">{resultType.id}</td>
                    <td className="border p-3">{resultType.type}</td>
                    <td className="border p-3">
                      <button
                        style={{color: "black"}}
                        className="bg-red-500 px-3 py-1 rounded-lg hover:bg-red-700 transition"
                        onClick={() => handleDelete(resultType.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};

export default AddResultType;
