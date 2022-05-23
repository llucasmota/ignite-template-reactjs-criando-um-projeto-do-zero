import { GetStaticProps } from 'next';

import { AiOutlineCalendar, AiOutlineUser } from 'react-icons/ai';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import Header from '../components/Header';
import { getPrismicClient } from '../services/prismic';

import commonStyles from '../styles/common.module.scss';
import styles from './home.module.scss';

interface Post {
  uid?: string;
  first_publication_date: string | null;
  data: {
    title: string;
    subtitle: string;
    author: string;
  };
}

interface PostPagination {
  next_page: string;
  results: Post[];
}

interface HomeProps {
  postsPagination: PostPagination;
}

const formatMyDate = (date: Date): string => {
  return format(new Date(date), '', { locale: '' });
};

export default function Home({ postsPagination }: HomeProps): JSX.Element {
  const { results } = postsPagination;
  return (
    <div className={styles.container}>
      <Header />
      {results.map(post => {
        return (
          <section key={post.uid} className={styles['container-post']}>
            <h3>{post.data.title}</h3>
            <p>{post.data.subtitle}</p>
            <div className={styles['container-event-info']}>
              <div className={styles.eventInfo}>
                <AiOutlineCalendar color="FFFFFF" />
                <span>
                  <time>
                    {format(
                      new Date(post.first_publication_date),
                      'dd MMM yyyy',
                      {
                        locale: ptBR,
                      }
                    )}
                  </time>
                </span>
              </div>
              <div className={styles.eventInfo}>
                <AiOutlineUser color="FFFFFF" />
                <span>{post.data.author}</span>
              </div>
            </div>
          </section>
        );
      })}
    </div>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const prismic = getPrismicClient();
  const { results } = await prismic.getByType('post-type');
  console.log(JSON.stringify(results));
  return {
    props: {
      postsPagination: { results },
    },
  };
};
