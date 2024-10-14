"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function Component() {
  const [votes, setVotes] = useState({ Python: 0, JavaScript: 0 });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Fetch the current poll results when the component mounts
    const fetchPollResults = async () => {
      try {
        const response = await fetch("/api/vote");
        const data = await response.json();

        setVotes({
          Python: data.find((option: { option: string }) => option.option === "Python")?.count || 0,
          JavaScript: data.find((option: { option: string }) => option.option === "JavaScript")?.count || 0,
        });

      } catch (error) {
        console.error("Error fetching poll results:", error)
      }
    }

    fetchPollResults()
  }, [])

  const handleVote = async (option: "Python" | "JavaScript") => {
    setLoading(true)
    try {
      const response = await fetch("/api/vote", {
        method: "POST",
        headers: {
          "Content-Type": "application/JavaScripton",
        },
        body: JSON.stringify({ option }),
      })

      if (!response.ok) {
        throw new Error("Error submitting vote")
      }

      const data = await response.json()
      if (data.message === "Vote submitted successfully!") {
        setVotes((prevVotes) => ({
          ...prevVotes,
          [option]: prevVotes[option] + 1,
        }))
      } else {
        alert(data.message)
      }

    } catch (error) {
      console.error("Error submitting vote:", error)
    } finally {
      setLoading(false)
    }
  }

  const totalVotes = votes.Python + votes.JavaScript
  const PythonPercentage = totalVotes ? (votes.Python / totalVotes) * 100 : 0
  const JavaScriptPercentage = totalVotes ? (votes.JavaScript / totalVotes) * 100 : 0

  return (
    <div className="flex items-center justify-center min-h-screen">
      <Card className="w-full max-w-md mx-auto bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800 shadow-lg">
        <CardHeader className="pb-2">
          <CardTitle className="text-3xl font-bold text-center text-purple-700 dark:text-purple-300">
            What is your favorite programming language?
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 p-6">
          <div className="space-y-4">
            <Button
              onClick={() => handleVote("Python")}
              className="w-full justify-between text-lg font-semibold py-6 bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 transition-all duration-300"
              disabled={loading}
            >
              <span>Python</span>
              <span className="bg-white text-purple-700 px-3 py-1 rounded-full text-sm">
                {votes.Python}
              </span>
            </Button>
            <div className="h-3 bg-gray-200 rounded-full overflow-hidden dark:bg-gray-700">
              <div
                className="h-full bg-gradient-to-r from-purple-500 to-indigo-500 transition-all duration-300 ease-in-out"
                style={{ width: `${PythonPercentage}%` }}
              />
            </div>
          </div>
          <div className="space-y-4">
            <Button
              onClick={() => handleVote("JavaScript")}
              className="w-full justify-between text-lg font-semibold py-6 bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 transition-all duration-300"
              disabled={loading}
            >
              <span>JavaScript</span>
              <span className="bg-white text-indigo-700 px-3 py-1 rounded-full text-sm">
                {votes.JavaScript}
              </span>
            </Button>
            <div className="h-3 bg-gray-200 rounded-full overflow-hidden dark:bg-gray-700">
              <div
                className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-300 ease-in-out"
                style={{ width: `${JavaScriptPercentage}%` }}
              />
            </div>
          </div>
          <p className="text-center text-sm font-medium text-gray-600 dark:text-gray-300 mt-4">
            Total votes: {totalVotes}
          </p>
        </CardContent>
      </Card>
    </div>
  )
}