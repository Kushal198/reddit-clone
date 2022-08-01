import { ArrowDownIcon, ArrowUpIcon, BookmarkIcon, ChatAltIcon, DotsHorizontalIcon, GiftIcon, ShareIcon } from '@heroicons/react/solid'
import React, { useEffect, useState } from 'react'
import Avatar from './Avatar'
import TimeAgo from 'react-timeago';
import Link from 'next/link'
import {Jelly} from '@uiball/loaders'
import { useSession } from 'next-auth/react';
import toast from 'react-hot-toast';
import { useMutation, useQuery } from '@apollo/client';
import {GET_ALL_VOTES_BY_POST_ID} from '../graphql/queries'
import {ADD_VOTE} from '../graphql/mutations'

type Props = {
  post:Post
}

function Post({post}:Props) {
  const [vote, setVote] = useState<Boolean>();
  const {data:session} = useSession()

  const {data, loading} = useQuery(GET_ALL_VOTES_BY_POST_ID,{
    variables:{
      post_id:post?.id
    }
  })

  const [addVote] = useMutation(ADD_VOTE,{
    refetchQueries:[GET_ALL_VOTES_BY_POST_ID, 'getVotesByPostId']
  })

  const upVote = async(isUpVote:Boolean) => {
    if(!session){
      toast('! You will need to sign in to vote');
      return;
    }
    if(vote && isUpVote) return
    if(vote === false && !isUpVote) return;
    console.log('voting...', isUpVote);
    await addVote({
      variables:{
        post_id:post.id,
        username:session?.user?.name,
        upvote:isUpVote
      }
    })
  }

  useEffect(() => {
    const votes: Vote[] = data?.getVotesByPostId;
    const vote = votes?.find(vote => vote.username == session?.user?.name)?.upvote
    setVote(vote)
  },[data]);

  const displayVotes = (data:any) => {
    const votes:Vote[] = data?.getVotesByPostId
    const displayNumbers = votes?.reduce((total, vote) => (vote.upvote?(total+=1) : (total -=1)),0)
    if(votes?.length === 0) return 0;
    if(displayNumbers === 0){
      return votes[0]?.upvote ? 1 : -1
    }
    return displayNumbers;
  }

  if(!post) return(
    <div className="flex items-center w-full justify-center p-10 text-xl">
      <Jelly size={50} color="#FF4501"/>
    </div>
  )
  return (
    <Link href={`/post/${post.id}`}>
    <div className="flex cursor-pointer border border-gray-300 bg-white shadow-sm hover:border-gray-600">
       {/*Votes*/}
       <div className="flex flex-col items-center justify-start space-y-1 rounded-l-md bg-gray-50 p-4 text-gray-400">
        <ArrowUpIcon onClick={() => upVote(true)} className={`voteButtons hover:text-red-400 ${vote && 'text-red-400'}`}/>
        <p className="text-xs font-bold text-black" >{displayVotes(data)}</p>
        <ArrowDownIcon onClick={() => upVote(false)} className={`voteButtons hover:text-blue-400 ${vote === false && 'text-blue-400'}`}/>
       </div>
       <div className="p-3 pb-1">
        {/* Header */}
        <div className="flex items-center space-x-2">
          <Avatar seed={post.subreddit?.topic}/>
          <p className="text-xs text-gray-400">
            <Link href={`/subreddit/${post.subreddit.topic}`}>
            <span className="font-bold text-black hover:text-blue-400">r/{post.subreddit?.topic}</span>
            </Link>
             . Posted by u/
             {post.username} <TimeAgo date={post.created_at}/>
          </p>
        </div>
        {/* Body */}
        <div className="py-4">
          <h2 className="text-xl font-semibold">{post.title}</h2>
          <p className="mt-2 text-sm font-light">{post.body}</p>
        </div>

        {/* Image */}
        <img src={post.image} className="w-full" alt="" />

        {/* Footer */}
    <div className="flex space-x-4 text-gray-400">
      <div className="postButtons">
        <ChatAltIcon className="h-6 w-6"/>
        <p className="">{post.comments.length}    Comments</p>
      </div>
      <div className="postButtons">
        <GiftIcon className="h-6 w-6"/>
        <p className="hidden sm:inline">{post.comments.length}    Award</p>
      </div>
      <div className="postButtons">
        <ShareIcon className="h-6 w-6"/>
        <p className="hidden sm:inline">{post.comments.length} Share</p>
      </div>
      <div className="postButtons">
        <BookmarkIcon className="h-6 w-6"/>
        <p className="hidden sm:inline">{post.comments.length}    Save</p>
      </div>
      <div className="postButtons">
        <DotsHorizontalIcon className="h-6 w-6"/>
       
      </div>
    </div>
       </div>
      
    </div>
    </Link>
  )
}

export default Post
