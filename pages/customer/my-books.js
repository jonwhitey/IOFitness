import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import Head from 'next/head';

import { getMyBookList } from '../../lib/api/customer';
import withAuth from '../../lib/withAuth';

class MyBooks extends React.Component {
  static propTypes = {
    purchasedBooks: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
      }),
    ),
  };

  static defaultProps = {
    purchasedBooks: [],
  };

  // generate MyBookList server-side
  static async getInitialProps({ req, res }) {
    // if not logged in, redirect to login page
    if (req && !req.user) {
      res.redirect('/login');
      return { purchasedBooks: [] };
    }

    // initialize headers obejct, if request object has a cookie, assign it to the headers object
    const headers = {};
    if (req && req.headers && req.headers.cookie) {
      headers.cookie = req.headers.cookie;
    }

    // send request to getMyBookList, assign response to purchasedBooks, return response
    const { purchasedBooks } = await getMyBookList({ headers });
    return { purchasedBooks };
  }

  render() {
    const { purchasedBooks } = this.props;
    return (
      <div>
        <Head>
          <title>My Books</title>
        </Head>
        <div style={{ padding: '10px 45px' }}>
          {purchasedBooks && purchasedBooks.length > 0 ? (
            <div>
              <h3>Your books</h3>
              <ul>
                {purchasedBooks.map((book) => (
                  <li key={book._id}>
                    <Link
                      as={`/books/${book.slug}/introduction`}
                      href={`/public/read-chapter?bookSlug=${book.slug}&chapterSlug=introduction`}
                    >
                      <a>{book.name}</a>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <div>
              <h3>Your books</h3>
              <p>You have not purchased any book.</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default withAuth(MyBooks);
