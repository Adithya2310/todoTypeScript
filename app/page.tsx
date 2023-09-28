import AddTodo from '@/components/AddTodo'
import styles from './page.module.css'

export default function Home() {
  return (
    <main className={styles.main}>
      <AddTodo/>
    </main>
  )
}
