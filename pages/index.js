import Home from '@/components/home';
import {TOTAL_PAGES} from '../db'

export default Home;

export async function getStaticProps(context) {
  return { 
    props: {
      totalPages:TOTAL_PAGES
    }
  }
}