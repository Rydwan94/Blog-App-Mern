import React, { useEffect, useState } from "react";


const DashPosts = () => {

  const [data, setData ] = useState([])
  const [fetchError, setFetchError] = useState<null | string>(null)

  useEffect(() => {
    const getPosts = async () => {
        try {
          const res = await fetch('/api/post/getposts')
          const data = await res.json()
          console.log(data)
          if(!res.ok){
            setFetchError(data.message)
          }else {
            setData(data)
          }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error:any) {
          console.log(error.message)
        }
    }

    getPosts()
  },[])

  console.log(data)
  return <div>DashPosts</div>;
};

export default DashPosts;
