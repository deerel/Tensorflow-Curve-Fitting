// Real solution coefficients
let Ca = Math.random() * 2.0 - 1.0;
let Cb = Math.random() * 2.0 - 1.0;
let Cc = Math.random() * 2.0 - 1.0;
let Cd = Math.random() * 2.0 - 1.0;
let Ce = Math.random() * 2.0 - 1.0;
let Cf = Math.random() * 2.0 - 1.0;
let Cg = Math.random() * 2.0 - 1.0;

// Calculates the solution for the coefficients.
function solveY(x) {
  return Ca * pow(x, 6) + Cb * pow(x, 5) + Cc * pow(x, 4) + Cd * pow(x, 3) + Ce * pow(x, 2) + Cf * x + Ce;
}

// Generates and returns input data.
function generateData(dataCount, sigma) {
  return tf.tidy(() => {
    const [a, b, c, d, e, f, g] = [tf.scalar(Ca), tf.scalar(Cb), tf.scalar(Cc), tf.scalar(Cd), tf.scalar(Ce), tf.scalar(Cf), tf.scalar(Cg)];
    const xs = tf.randomUniform([dataCount], -1, 1);
    const ys = a.mul(xs.pow(tf.scalar(6)))
              .add(b.mul(xs.pow(tf.scalar(5))))
              .add(c.mul(xs.pow(tf.scalar(4))))
              .add(d.mul(xs.pow(tf.scalar(3))))
              .add(e.mul(xs.square()))
              .add(f.mul(xs))
              .add(g)
              .add(tf.randomNormal([dataCount], 0 , sigma));

    // Normalizing ys
    const ymin = ys.min();
    const ymax = ys.max();
    const yrange = ymax.sub(ymin);
    const ysNormalized = ys.sub(ymin).div(yrange);

    return {xs, ys: ysNormalized};
  })
}
