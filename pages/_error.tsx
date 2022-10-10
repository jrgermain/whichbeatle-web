import { NextPage } from "next";
import Head from "next/head";
import ContentLayout from "../components/content-layout";
import {
  getRandomMessage,
  getStatusCodeDescription,
} from "../utils/error-handling";

type ErrorPageProps = {
  message: string;
  statusCode: number;
  statusDescription: string;
};

const ErrorPage: NextPage<ErrorPageProps> = ({
  message,
  statusCode,
  statusDescription,
}) => {
  return (
    <>
      <Head>
        <title>Error - Which Beatle?</title>
      </Head>
      <main>
        <ContentLayout>
          <h1>Error {statusCode}</h1>
          <p>
            {message} {statusDescription}
          </p>
        </ContentLayout>
      </main>
    </>
  );
};

ErrorPage.getInitialProps = ({ res, err }) => {
  const statusCode = res?.statusCode ?? err?.statusCode ?? 404;
  return {
    message: getRandomMessage(),
    statusDescription: getStatusCodeDescription(statusCode),
    statusCode,
  };
};

export default ErrorPage;
