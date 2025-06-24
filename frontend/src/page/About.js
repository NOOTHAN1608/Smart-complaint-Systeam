import React from "react";

const AboutUs = () => {
  const pageContainerStyle = {
    width: "100vw",
    height: "100vh",
    overflowY: "auto",
    padding: "20px",
    backgroundColor: "#121212",
    color: "#ffffff",
    boxSizing: "border-box",
  };

  const containerStyle = {
    fontFamily: "Arial, sans-serif",
    margin: "0 auto",
    maxWidth: "1000px",
    textAlign: "center",
  };

  const imageStyle = {
    width: "100%",
    height: "300px",
    objectFit: "cover",
    borderRadius: "10px",
  };

  const buttonContainerStyle = {
    display: "flex",
    justifyContent: "space-around",
    margin: "20px 0",
    flexWrap: "wrap",
  };

  const buttonStyle = {
    padding: "10px 20px",
    fontSize: "16px",
    border: "none",
    borderRadius: "5px",
    backgroundColor: "#007BFF", 
    color: "white",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
    margin: "5px",
  };

  const sectionStyle = {
    padding: "40px 20px",
    margin: "20px 0",
    borderRadius: "8px",
    boxShadow: "0 2px 4px rgba(255, 255, 255, 0.1)", // Light shadow for contrast
    backgroundColor: "#1e1e1e", // Dark section background
  };

  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };
  
  
  return (
    <div style={pageContainerStyle}>
      <div style={containerStyle}>
        <img
          src="https://media.istockphoto.com/id/1192261427/photo/vidhan-soudha-bangalore.jpg?s=2048x2048&w=is&k=20&c=vM0xJd1AcfZxJw4WCP1X9XW85Dt0-r2Cum5_Y0A3lR0="
          alt="About Us"
          style={imageStyle}
        />
        <div style={buttonContainerStyle}>
          <button
            style={buttonStyle}
            onClick={() => scrollToSection("about-complaints")}
          >
            About Complaints
          </button>
          <button
            style={buttonStyle}
            onClick={() => scrollToSection("did-you-know")}
          >
            Did You Know?
          </button>
          <button
            style={buttonStyle}
            onClick={() => scrollToSection("our-history")}
          >
            Our History
          </button>
          <button
            style={buttonStyle}
            onClick={() => scrollToSection("partnerships")}
          >
            Partnerships
          </button>
        </div>
        <div id="about-complaints" style={sectionStyle}>
          <h1>ABOUT COMPLAINTS</h1>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div style={{ flex: 1, paddingRight: "20px", textAlign: "left" }}>
              <p>
                Water leaks from underground or overhead pipes can lead to water
                wastage and property damage.<br></br>
                <br></br>
                Street lights that are not positioned correctly may not
                illuminate pedestrian pathways or intersections effectively.
                <br></br>
                <br></br>
                Inadequate drainage infrastructure may fail to handle heavy
                rainfall, causing water to overflow onto streets and properties
                <br></br> <br></br>
                Trees that fall onto roads can block traffic, creating hazards
                for drivers and pedestrians. This can occur due to severe
                weather conditions, such as storms or high winds{" "}
              </p>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
                <img
                  src="https://media.istockphoto.com/id/1165756186/photo/water-pipe-break-exposing-a-burst-water-main-focused-on-the-spraying-water-and-the-pipe.jpg?s=2048x2048&w=is&k=20&c=pus6Rp8EzeqVbcfIoYUq5dRjyufGK_xmLI3kN72G200="
                  alt="Water Leak"
                  style={{
                    width: "48%", // Two images per row
                    height: "auto",
                    borderRadius: "10px",
                    transition: "transform 0.3s ease", // Smooth transition for zoom effect
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.transform = "scale(1.1)")
                  } // Zoom in on hover
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.transform = "scale(1)")
                  } // Zoom out when not hovering
                />
                <img
                  src="https://cdn.pixabay.com/photo/2019/09/22/06/29/lap-4495233_640.jpg"
                  alt="Public Issue"
                  style={{
                    width: "48%",
                    height: "auto",
                    borderRadius: "10px",
                    transition: "transform 0.3s ease",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.transform = "scale(1.1)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.transform = "scale(1)")
                  }
                />
                <img
                  src="https://cdn.pixabay.com/photo/2017/09/08/18/20/garbage-2729608_640.jpg"
                  alt="Street Lighting"
                  style={{
                    width: "48%",
                    height: "auto",
                    borderRadius: "10px",
                    transition: "transform 0.3s ease",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.transform = "scale(1.1)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.transform = "scale(1)")
                  }
                />
                <img
                  src="https://cdn.pixabay.com/photo/2014/12/14/08/48/forward-567664_1280.jpg"
                  alt="Community Event"
                  style={{
                    width: "48%",
                    height: "auto",
                    borderRadius: "10px",
                    transition: "transform 0.3s ease",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.transform = "scale(1.1)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.transform = "scale(1)")
                  }
                />
              </div>
            </div>
          </div>
        </div>
        <div id="did-you-know" style={sectionStyle}>
          <h1>DID YOU KNOW?</h1>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
                <img
                  src="https://cdn.pixabay.com/photo/2015/07/11/22/57/city-841408_1280.jpg"
                  alt="Urban Issues"
                  style={{
                    width: "48%", // Two images per row
                    height: "auto",
                    borderRadius: "10px",
                    transition: "transform 0.3s ease", // Smooth transition for zoom effect
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.transform = "scale(1.1)")
                  } // Zoom in on hover
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.transform = "scale(1)")
                  } // Zoom out when not hovering
                />
                <img
                  src="https://cdn.pixabay.com/photo/2016/09/25/16/40/way-1694101_640.jpg"
                  alt="Technology"
                  style={{
                    width: "48%",
                    height: "auto",
                    borderRadius: "10px",
                    transition: "transform 0.3s ease",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.transform = "scale(1.1)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.transform = "scale(1)")
                  }
                />
                <img
                  src="https://cdn.pixabay.com/photo/2017/09/14/12/19/building-2748840_640.jpg"
                  alt="Data Analytics"
                  style={{
                    width: "48%",
                    height: "auto",
                    borderRadius: "10px",
                    transition: "transform 0.3s ease",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.transform = "scale(1.1)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.transform = "scale(1)")
                  }
                />
                <img
                  src="https://cdn.pixabay.com/photo/2015/08/03/00/49/installation-872778_640.jpg"
                  alt="Community Engagement"
                  style={{
                    width: "48%",
                    height: "auto",
                    borderRadius: "10px",
                    transition: "transform 0.3s ease",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.transform = "scale(1.1)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.transform = "scale(1)")
                  }
                />
              </div>
            </div>
            <div style={{ flex: 1, paddingLeft: "20px", textAlign: "left" }}>
              <p>
                Over 80% of complaints in urban areas go unresolved due to lack
                of a streamlined process.<br></br>
                <br></br>
                Our platform bridges this gap with technology and innovation,
                ensuring that every voice is heard and addressed promptly.
                <br></br>
                <br></br>
                By utilizing data analytics, we can identify recurring issues
                and prioritize them effectively, making urban living more
                efficient and responsive.
              </p>
            </div>
          </div>
        </div>
        <div id="our-history" style={sectionStyle}>
          <h1>OUR HISTORY</h1>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div style={{ flex: 1, paddingRight: "20px", textAlign: "left" }}>
              <p>
                Founded in 2025, the Smart Complaint System was designed to
                address the growing need for effective issue resolution. Since
                then, we've resolved over 10,000 cases across multiple
                communities.<br></br>
                <br></br>
                Our mission is to enhance communication between citizens and
                local authorities, ensuring that every complaint is heard and
                acted upon promptly.<br></br>
                <br></br>
                Through continuous improvement and innovation, we strive to make
                urban living more efficient and responsive to the needs of our
                residents.
              </p>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
                <img
                  src="https://elements-resized.envatousercontent.com/envato-shoebox/54f2/2767-504d-4263-8f39-ea63af4ccf5e/bviretz1kp0PI1maCVEfUGOQIJNDD3rz5HUmGarL.jpg?w=800&cf_fit=scale-down&mark-alpha=18&mark=https%3A%2F%2Felements-assets.envato.com%2Fstatic%2Fwatermark4.png&q=85&format=auto&s=c293410143d573973b1239326962ca63f0f5d2443099e8098b635412a9fc586e"
                  alt="History of Complaints"
                  style={{
                    width: "48%", // Two images per row
                    height: "auto",
                    borderRadius: "10px",
                    transition: "transform 0.3s ease", // Smooth transition for zoom effect
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.transform = "scale(1.1)")
                  } // Zoom in on hover
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.transform = "scale(1)")
                  } // Zoom out when not hovering
                />
                <img
                  src="https://cdn.pixabay.com/photo/2016/03/27/19/22/city-1283801_640.jpg"
                  alt="Community Engagement"
                  style={{
                    width: "48%",
                    height: "auto",
                    borderRadius: "10px",
                    transition: "transform 0.3s ease",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.transform = "scale(1.1)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.transform = "scale(1)")
                  }
                />
                <img
                  src="https://cdn.pixabay.com/photo/2016/11/18/14/43/forest-1835019_960_720.jpg"
                  alt="Urban Development"
                  style={{
                    width: "48%",
                    height: "auto",
                    borderRadius: "10px",
                    transition: "transform 0.3s ease",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.transform = "scale(1.1)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.transform = "scale(1)")
                  }
                />
                <img
                  src="https://cdn.pixabay.com/photo/2023/05/19/04/31/road-8003640_640.jpg"
                  alt="Community Improvement"
                  style={{
                    width: "48%",
                    height: "auto",
                    borderRadius: "10px",
                    transition: "transform 0.3s ease",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.transform = "scale(1.1)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.transform = "scale(1)")
                  }
                />
              </div>
            </div>
          </div>
        </div>
        <div id="partnerships" style={sectionStyle}>
          <h1>PARTNERSHIPS AND COLLABORATIONS</h1>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
                <img
                  src="https://cdn.pixabay.com/photo/2014/03/22/17/32/suvarna-vidhana-soudha-292741_640.jpg"
                  alt="Community Collaboration"
                  style={{
                    width: "48%", // Two images per row
                    height: "auto",
                    borderRadius: "10px",
                    transition: "transform 0.3s ease", // Smooth transition for zoom effect
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.transform = "scale(1.1)")
                  } // Zoom in on hover
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.transform = "scale(1)")
                  } // Zoom out when not hovering
                />
                <img
                  src="https://cdn.pixabay.com/photo/2022/08/04/01/47/refrigeration-7363620_640.jpg"
                  alt="Local Government Partnership"
                  style={{
                    width: "48%",
                    height: "auto",
                    borderRadius: "10px",
                    transition: "transform 0.3s ease",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.transform = "scale(1.1)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.transform = "scale(1)")
                  }
                />
                <img
                  src="https://cdn.pixabay.com/photo/2019/10/06/10/03/team-4529717_640.jpg"
                  alt="NGO Collaboration"
                  style={{
                    width: "48%",
                    height: "auto",
                    borderRadius: "10px",
                    transition: "transform 0.3s ease",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.transform = "scale(1.1)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.transform = "scale(1)")
                  }
                />
                <img
                  src="https://cdn.pixabay.com/photo/2017/09/05/19/17/crowd-2718834_960_720.jpg"
                  alt="Community Engagement"
                  style={{
                    width: "48%",
                    height: "auto",
                    borderRadius: "10px",
                    transition: "transform 0.3s ease",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.transform = "scale(1.1)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.transform = "scale(1)")
                  }
                />
              </div>
            </div>
            <div style={{ flex: 1, paddingLeft: "20px", textAlign: "left" }}>
              <p>
                The success of the Smart Complaint System is amplified by our
                strategic partnerships with local governments, NGOs, and
                community organizations. These collaborations enable us to:
              </p>

              <li>
                Address complaints more efficiently with government support.
              </li>
              <li>
                Leverage resources and expertise from NGOs to resolve complex
                issues.
              </li>
              <li>
                Foster community engagement and participation for sustainable
                solutions.
              </li>

              <p>
                Together, we are building a smarter, more inclusive system that
                caters to the needs of every citizen. Reach out to learn more
                about our partnerships and how they enhance urban living.
              </p>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default AboutUs;
