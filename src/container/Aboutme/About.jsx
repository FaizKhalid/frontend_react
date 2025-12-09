import React, { useState, useEffect } from "react";
import { AppWrap, MotionWrap } from "../../wrapper";
import {
  Container,
  Typography,
  Box,
  Grid,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { client } from "../../client";

const HeroSection = styled(Box)(({ theme }) => ({
  position: "relative",
  backgroundColor: "#f8f9fa",
  padding: theme.spacing(12, 0),
  overflow: "hidden",
  [theme.breakpoints.down("md")]: {
    padding: theme.spacing(8, 0),
  },
  "&::before": {
    content: '""',
    position: "absolute",
    right: "-10%",
    bottom: "-20%",
    width: "500px",
    height: "500px",
    borderRadius: "50%",
    backgroundColor: "#e8f5e9",
    opacity: 0.6,
    zIndex: 0,
    [theme.breakpoints.down("md")]: {
      width: "300px",
      height: "300px",
    },
  },
  "&::after": {
    content: '""',
    position: "absolute",
    left: "5%",
    top: "10%",
    width: "200px",
    height: "200px",
    borderRadius: "50%",
    backgroundColor: "#e3f2fd",
    opacity: 0.4,
    zIndex: 0,
    [theme.breakpoints.down("md")]: {
      width: "150px",
      height: "150px",
    },
  },
}));

const ImageBox = styled(Box)(({ theme, shape }) => ({
  height: "400px",
  width: "90%",
  marginLeft: "auto",
  marginRight: "auto",
  backgroundSize: "cover",
  backgroundPosition: "center",
  position: "relative",
  overflow: "hidden",
  clipPath:
    shape === "shape1"
      ? 'path("M 180 40 C 80 0, 0 60, 0 180 C 0 300, 60 380, 180 400 C 300 420, 380 360, 400 240 C 420 120, 300 80, 180 40")'
      : shape === "shape2"
      ? 'path("M 0 100 C 0 0, 100 0, 200 0 C 300 0, 400 60, 400 160 C 400 260, 360 340, 260 380 C 160 420, 60 360, 0 260 L 0 100")'
      : 'path("M 40 0 C 140 0, 260 0, 360 40 C 460 80, 400 180, 400 280 C 400 380, 300 400, 200 400 C 100 400, 0 340, 0 240 C 0 140, 60 60, 160 0 L 40 0")',
  transform: "scale(1.1)",
  [theme.breakpoints.down("md")]: {
    height: "350px",
    transform: "scale(1.05)",
  },
  [theme.breakpoints.down("sm")]: {
    height: "250px",
    transform: "scale(1)",
  },
  "&::after": {
    content: '""',
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: "30%",
    background: "linear-gradient(to top, rgba(0,0,0,0.3), transparent)",
  },
  transition: "transform 0.3s ease-in-out",
  "&:hover": {
    transform: "scale(1.2)",
    [theme.breakpoints.down("md")]: {
      transform: "scale(1.1)",
    },
    [theme.breakpoints.down("sm")]: {
      transform: "scale(1.05)",
    },
  },
}));

const SmallText = styled(Typography)(({ theme }) => ({
  color: "#2e7d32",
  fontWeight: 600,
  textTransform: "uppercase",
  letterSpacing: "1.5px",
  fontSize: "0.875rem",
  marginBottom: theme.spacing(2),
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  color: "#1a237e",
  marginBottom: theme.spacing(3),
  fontWeight: 700,
  fontSize: "2.5rem",
  textTransform: "uppercase",
  lineHeight: 1.2,
  [theme.breakpoints.down("md")]: {
    fontSize: "2rem",
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "1.8rem",
  },
}));

const TextContent = styled(Box)(({ theme }) => ({
  padding: theme.spacing(4, 0),
  "& p": {
    fontSize: "1.1rem",
    lineHeight: 1.8,
    color: "#546e7a",
    marginBottom: theme.spacing(3),
    [theme.breakpoints.down("sm")]: {
      fontSize: "1rem",
      lineHeight: 1.6,
    },
  },
}));

const DotPattern = styled(Box)(({ theme }) => ({
  position: "absolute",
  width: "200px",
  height: "200px",
  backgroundImage: "radial-gradient(#e0e0e0 2px, transparent 2px)",
  backgroundSize: "15px 15px",
  opacity: 0.3,
  zIndex: 0,
  [theme.breakpoints.down("md")]: {
    width: "150px",
    height: "150px",
    backgroundSize: "10px 10px",
  },
  [theme.breakpoints.down("sm")]: {
    width: "100px",
    height: "100px",
    backgroundSize: "8px 8px",
  },
}));

function About() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));
  const [loading, setLoading] = useState(true);
  const [content, setContent] = useState({
    hero: {
      title: "Crafting exceptional architectural experiences",
      subtitle:
        "We shape experiences, influence emotions, and redefine the way people live and work through innovative design solutions.",
      heroImage:
        "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1600&q=80",
    },
    introduction: {
      title: "Introduction",
      description:
        "At Gomal Studio, we believe that architecture and interior design go beyond aesthetics—they shape experiences, influence emotions, and redefine the way people live and work.",
      introImage:
        "https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?auto=format&fit=crop&w=1600&q=80",
    },
    vision: {
      title: "Vision",
      description:
        "To be a leading global freelance design studio, transforming ideas into exceptional spaces that inspire, elevate lifestyles, and empower businesses.",
      visionImage:
        "https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?auto=format&fit=crop&w=1600&q=80",
    },
    mission: {
      title: "Mission",
      points: [
        "Deliver Timeless & Functional Designs",
        "Make Premium Design Accessible",
        "Personalized & Client-Centric Approach",
        "Embrace Innovation & Sustainability",
        "Redefining Freelance Design",
      ],
      missionImage:
        "https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?auto=format&fit=crop&w=1600&q=80",
    },
  });

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const query = `*[_type == "aboutPage"][0]{
          hero {
            title,
            subtitle,
            "heroImage": image.asset->url
          },
          introduction {
            title,
            description,
            "introImage": image.asset->url
          },
          vision {
            title,
            description,
            "visionImage": image.asset->url
          },
          mission {
            title,
            points[],
            "missionImage": image.asset->url
          }
        }`;

        const result = await client.fetch(query);

        if (result) {
          setContent((prev) => ({
            hero: { ...prev.hero, ...result.hero },
            introduction: { ...prev.introduction, ...result.introduction },
            vision: { ...prev.vision, ...result.vision },
            mission: { ...prev.mission, ...result.mission },
          }));
        }

        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };

    fetchContent();
  }, []);

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Typography>Loading content...</Typography>
      </Box>
    );
  }

  return (
    <Box>
      <Container maxWidth="lg">
        {/* INTRODUCTION */}
        <Grid
          container
          spacing={isTablet ? 8 : 12}
          sx={{ my: { xs: 8, sm: 10, md: 16 } }}
          alignItems="center"
        >
          <Grid item xs={12} md={6}>
            <TextContent>
              <SmallText>WHO WE ARE</SmallText>
              <SectionTitle variant="h2">
                {content.introduction.title}
              </SectionTitle>
              <Typography>{content.introduction.description}</Typography>
            </TextContent>
          </Grid>
          <Grid
            item
            xs={12}
            md={6}
            sx={{ display: { xs: "none", md: "block" } }}
          >
            <Box sx={{ position: "relative" }}>
              <DotPattern sx={{ left: "-20px", bottom: "-20px" }} />
              <ImageBox
                shape="shape2"
                sx={{
                  backgroundImage: `url(${content.introduction.introImage})`,
                }}
              />
            </Box>
          </Grid>
        </Grid>

        {/* VISION */}
        <Grid
          container
          spacing={isTablet ? 8 : 12}
          sx={{ my: { xs: 8, sm: 10, md: 16 } }}
          alignItems="center"
        >
          <Grid
            item
            xs={12}
            md={6}
            sx={{ display: { xs: "none", md: "block" } }}
          >
            <Box sx={{ position: "relative" }}>
              <DotPattern sx={{ right: "-20px", top: "-20px" }} />
              <ImageBox
                shape="shape3"
                sx={{ backgroundImage: `url(${content.vision.visionImage})` }}
              />
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <TextContent>
              <SmallText>OUR GOALS</SmallText>
              <SectionTitle variant="h2">{content.vision.title}</SectionTitle>
              <Typography>{content.vision.description}</Typography>
            </TextContent>
          </Grid>
        </Grid>

        {/* MISSION */}
        <Grid
          container
          spacing={isTablet ? 8 : 12}
          sx={{ my: { xs: 8, sm: 10, md: 16 } }}
          alignItems="center"
        >
          <Grid item xs={12} md={6}>
            <TextContent>
              <SmallText>OUR COMMITMENT</SmallText>
              <SectionTitle variant="h2">{content.mission.title}</SectionTitle>
              <Box sx={{ pl: 2, borderLeft: "3px solid #2e7d32" }}>
                {content.mission.points.map((point, i) => (
                  <Typography key={i} sx={{ mb: 2 }}>
                    • {point}
                  </Typography>
                ))}
              </Box>
            </TextContent>
          </Grid>

          <Grid
            item
            xs={12}
            md={6}
            sx={{ display: { xs: "none", md: "block" } }}
          >
            <Box sx={{ position: "relative" }}>
              <DotPattern sx={{ left: "-20px", bottom: "-20px" }} />
              <ImageBox
                shape="shape1"
                sx={{ backgroundImage: `url(${content.mission.missionImage})` }}
              />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default AppWrap(
  MotionWrap(About, "app__about"),
  "about",
  "app__whitebg"
);
