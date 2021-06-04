import { Link } from '@/components'
import { useToplist } from '@/data'
import { path } from '@/path'

import styles from './charts.module.scss'

export const Charts: React.FC = () => {
  const { data } = useToplist()
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        {data?.list?.map((chart) => (
          <Link key={chart.id} href={path.chart(chart.id)}>
            <div className={styles.chart}>
              <img src={chart.coverImgUrl} alt="Cover image of chart" />
              <span>{chart.name}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Charts
