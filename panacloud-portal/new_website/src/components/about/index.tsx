import React, { FC } from "react";
import theme, { useStyles } from "./style";
import { graphql, useStaticQuery } from "gatsby";
import { Container } from "./Container";
import { Challenges } from "./Challenges";
import useWindowDimensions from "./util/windowDimensionHook";
import { ThemeProvider } from "@material-ui/styles";
import { Typography } from "@material-ui/core";

const aboutQuery = graphql`
  query MyQuery {
    allContentfulAboutSection {
      nodes {
        order
        description {
          description
        }
        title
        image {
          file {
            url
            fileName
          }
        }
      }
    }
    allContentfulAbout {
      nodes {
        title
        mainPoints
      }
    }
  }
`;

/* function that sorts the content of about section based on property order */
const orderAboutSectionContent = (data: any[]) => {
  return data.sort((a, b) => (a.order > b.order ? 1 : -1));
};

const About: FC = () => {
  const { width } = useWindowDimensions();

  const data = useStaticQuery(aboutQuery);
  const abountContent = orderAboutSectionContent(
    data.allContentfulAboutSection.nodes
  );

  const classes = useStyles();
  return (
    <div className={classes.root}>
      {/* Header of the page */}
      <ThemeProvider theme={theme}>
        <Typography className={classes.heading} variant="h4" gutterBottom>
          {data.allContentfulAbout.nodes[0].title}
        </Typography>
      </ThemeProvider>

      {/* It displays the body content of about section in an alternate pattern; width is used for changing
        order on mobile view
      */}
      <div>
        {abountContent &&
          abountContent.map((about) =>
            about.order % 2 === 1 ? (
              width !== null && width < 960 ? (
                <Container
                  key={about.order}
                  title={about.title}
                  image={about.image.file.url}
                  description={about.description.description}
                  imageFirst={true}
                />
              ) : (
                <Container
                  key={about.order}
                  title={about.title}
                  image={about.image.file.url}
                  description={about.description.description}
                  imageFirst={false}
                />
              )
            ) : (
              <Container
                key={about.order}
                title={about.title}
                image={about.image.file.url}
                description={about.description.description}
                imageFirst={true}
              />
            )
          )}
      </div>
      {/* Displays the bullet points in card form */}
      <Challenges mainPoints={data.allContentfulAbout.nodes[0].mainPoints} />
    </div>
  );
};

export default About;
