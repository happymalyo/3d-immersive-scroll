const CloudScene = () => {
    const cloudParticles = useRef([]);
  
    // Load texture and set up clouds
    useEffect(() => {
      const loader = new THREE.TextureLoader();
      loader.load('./background/smokeTexture.png', (texture) => {
        const cloudGeo = new THREE.PlaneGeometry(500, 500);
        const cloudMaterial = new THREE.MeshLambertMaterial({
          map: texture,
          transparent: true,
        });
  
        for (let p = 0; p < 25; p++) {
          const cloud = new THREE.Mesh(cloudGeo, cloudMaterial);
          cloud.position.set(
            Math.random() * 800 - 400,
            500,
            Math.random() * 500 - 500
          );
          cloud.rotation.x = 1.16;
          cloud.rotation.y = -0.12;
          cloud.rotation.z = Math.random() * 2 * Math.PI;
          cloud.material.opacity = 0.55;
          cloudParticles.current.push(cloud);
        }
        animate();
      });
    }, []);
  
    // Animation logic for clouds
    useFrame(() => {
      cloudParticles.current.forEach((p) => {
        p.rotation.z -= 0.002;
      });
      animate()
    });
  
    return <group>{cloudParticles.current.map((cloud, index) => <primitive key={index} object={cloud} />)}</group>;
  };
  