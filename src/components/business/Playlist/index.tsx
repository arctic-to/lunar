import styles from './Playlist.module.scss'

export type PlaylistProps = {
  playlist: {
    id: number
    name: string
    trackCount: number
    coverImgUrl: string
    creator: {
      nickname: string
    }
  }
}

export const Playlist: React.FC<PlaylistProps> = ({ playlist }) => {
  return (
    <div className={styles.container}>
      <img src={playlist.coverImgUrl} alt="cover image" />
      <span className={styles.name}>{playlist.name}</span>
      <span className={styles.count}>{playlist.trackCount}首</span>
      <span className={styles.creater}>{playlist.creator.nickname}</span>
    </div>
  )
}

export default Playlist
