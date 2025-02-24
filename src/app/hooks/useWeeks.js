import { useState, useEffect } from "react";
import { getLocalStorage } from "../utils/localStorage";

const useWeeks = () => {
  const [weeks, setWeeks] = useState([]);
  const [week, setWeek] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [pagination, setPagination] = useState({
    totalWeeks: 0,
    currentPage: 1,
    totalPages: 1,
  });
  const [token, setToken] = useState(null);

  // First effect to set token
  useEffect(() => {
    const storedToken = getLocalStorage("token");
    setToken(storedToken);
  }, []);

  const fetchWeeks = async () => {
    if (!token) {
      console.log("No token available");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      console.log("Fetching weeks with token:", token); // Debug log
      const response = await fetch(`https://www.talkietotz.com/weeks/all`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch weeks");
      }

      const data = await response.json();
      console.log("Fetched Weeks Data:", data); // Debug log
      setWeeks(data);
    } catch (err) {
      console.error("Error fetching weeks:", err); // Debug log
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Second effect to fetch data when token is available
  useEffect(() => {
    if (token) {
      console.log("Token available, fetching weeks"); // Debug log
      fetchWeeks();
    }
  }, [token]);

  const getWeekById = async (weekId) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `https://www.talkietotz.com/weeks/${weekId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) throw new Error("Failed to fetch week");

      const data = await response.json();
      setWeek(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const createWeek = async (weekData) => {
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await fetch("https://www.talkietotz.com/weeks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(weekData),
      });

      if (!response.ok) throw new Error("Failed to create week");

      const data = await response.json();
      setSuccess("Week created successfully!");
      fetchWeeks();
      return data;
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const updateWeek = async (weekId, updatedData) => {
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await fetch(
        `https://www.talkietotz.com/weeks/${weekId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(updatedData),
        }
      );

      if (!response.ok) throw new Error("Failed to update week");

      const data = await response.json();
      setSuccess("Week updated successfully!");
      fetchWeeks();
      return data;
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const deleteWeek = async (weekId) => {
    setLoading(true);
    setError(null);
    setSuccess(null);
    console.log("weekId:", weekId); // For debugging
    try {
      const response = await fetch(
        `https://www.talkietotz.com/weeks/${weekId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) throw new Error("Failed to delete week");

      setSuccess("Week deleted successfully!");
      fetchWeeks();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    weeks,
    week,
    loading,
    error,
    success,
    pagination,
    fetchWeeks,
    getWeekById,
    createWeek,
    updateWeek,
    deleteWeek,
  };
};

export default useWeeks;

// import { useState, useEffect } from 'react';

// const useWeeks = () => {
//   const [weeks, setWeeks] = useState([]);
//   const [week, setWeek] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [success, setSuccess] = useState(null);

//   const token =
//     'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2N2ExM2IxN2IwMDgxZDI1MjRlNGRlM2MiLCJlbWFpbCI6InJhb3J2cDIwQGdtYWlsLmNvbSIsImlhdCI6MTczODk0MzcxMywiZXhwIjoxNzM5NTQ4NTEzfQ.R4yC3IDUOydD_YiVv9JPSgCC6MB9wX4sAGf-zL-_yNw';

//   const fetchWeeks = async () => {
//     setLoading(true);
//     setError(null);

//     try {
//       const response = await fetch('https://www.talkietotz.com/weeks', {
//         method: 'GET',
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       if (!response.ok) throw new Error('Failed to fetch weeks');

//       const data = await response.json();
//       setWeeks(data);
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const getWeekById = async (weekId) => {
//     setLoading(true);
//     setError(null);

//     try {
//       const response = await fetch(`https://www.talkietotz.com/weeks/${weekId}`, {
//         method: 'GET',
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       if (!response.ok) throw new Error('Failed to fetch week');

//       const data = await response.json();
//       setWeek(data);
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const createWeek = async (weekData) => {
//     setLoading(true);
//     setError(null);
//     setSuccess(null);

//     try {
//       const response = await fetch('https://www.talkietotz.com/weeks', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify(weekData),
//       });

//       if (!response.ok) throw new Error('Failed to create week');

//       const data = await response.json();
//       setSuccess('Week created successfully!');
//       fetchWeeks();
//       return data;
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const updateWeek = async (weekId, updatedData) => {
//     setLoading(true);
//     setError(null);
//     setSuccess(null);

//     try {
//       const response = await fetch(`https://www.talkietotz.com/weeks/${weekId}`, {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify(updatedData),
//       });

//       if (!response.ok) throw new Error('Failed to update week');

//       const data = await response.json();
//       setSuccess('Week updated successfully!');
//       fetchWeeks();
//       return data;
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const deleteWeek = async (weekId) => {
//     setLoading(true);
//     setError(null);
//     setSuccess(null);

//     try {
//       const response = await fetch(`https://www.talkietotz.com/weeks/${weekId}`, {
//         method: 'DELETE',
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       if (!response.ok) throw new Error('Failed to delete week');

//       setSuccess('Week deleted successfully!');
//       fetchWeeks();
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchWeeks();
//   }, []);

//   return {
//     weeks,
//     week,
//     loading,
//     error,
//     success,
//     fetchWeeks,
//     getWeekById,
//     createWeek,
//     updateWeek,
//     deleteWeek,
//   };
// };

// export default useWeeks;
