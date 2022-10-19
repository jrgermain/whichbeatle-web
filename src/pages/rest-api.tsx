import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import ContentLayout from "../components/content-layout";

const RestApi: NextPage = () => {
  return (
    <>
      <Head>
        <title>API - Which Beatle?</title>
      </Head>
      <main>
        <ContentLayout>
          <h1>
            Introducing the <em>Which Beatle?</em> API
          </h1>
          <p>
            <em>Which Beatle?</em> now includes a REST API (sometimes also
            referred to as a RESTful API). This API lets people who build other
            websites and apps search for information about Beatles songs using
            this site{"'"}s data.
          </p>
          <p>
            If you{"'"}d like to use this API in your app, you might be
            interested in our{" "}
            <Link href="/api">
              <a>OpenAPI documentation</a>
            </Link>
            .
          </p>
          <p>
            You can also download our OpenAPI specification as{" "}
            <Link href="/api/openapi.json">
              <a>JSON</a>
            </Link>{" "}
            or{" "}
            <Link href="/api/openapi.yaml">
              <a>YAML</a>
            </Link>
            .
          </p>
        </ContentLayout>
      </main>
    </>
  );
};

export default RestApi;
