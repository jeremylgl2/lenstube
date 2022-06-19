import ShareModal from '@components/Common/VideoCard/ShareModal'
import VideoOptions from '@components/Common/VideoCard/VideoOptions'
import getThumbnailUrl from '@utils/functions/getThumbnailUrl'
import imageCdn from '@utils/functions/imageCdn'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import Link from 'next/link'
import React, { useState } from 'react'
import { LenstubePublication } from 'src/types/local'
dayjs.extend(relativeTime)

const SuggestedVideoCard = ({ video }: { video: LenstubePublication }) => {
  const [showShare, setShowShare] = useState(false)

  return (
    <div className="flex justify-between group">
      <ShareModal video={video} show={showShare} setShowShare={setShowShare} />
      <div className="flex justify-between truncate">
        <Link href={`/watch/${video.id}`}>
          <a className="flex-none overflow-hidden rounded-lg cursor-pointer">
            <img
              src={imageCdn(getThumbnailUrl(video))}
              alt=""
              draggable={false}
              className="object-cover object-center h-24 w-44"
            />
          </a>
        </Link>
        <div className="flex items-start px-2.5">
          <div className="flex flex-col items-start flex-1 pb-1">
            <span className="flex w-full items-start justify-between space-x-1.5">
              <Link passHref href={`/watch/${video.id}`}>
                <a className="mb-1.5 text-sm font-medium line-clamp-2">
                  {video.metadata?.name}
                </a>
              </Link>
            </span>
            <Link href={`/${video.profile?.handle}`}>
              <a className="text-xs truncate hover:opacity-100 opacity-70">
                {video.profile?.handle}
              </a>
            </Link>
            <div className="flex items-center text-[11px] opacity-70 mt-0.5">
              <span>{dayjs(new Date(video.createdAt)).fromNow()}</span>
            </div>
          </div>
        </div>
      </div>
      <VideoOptions video={video} setShowShare={setShowShare} />
    </div>
  )
}

export default SuggestedVideoCard