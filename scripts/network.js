// Variables used by the predict function and
// updated by the train function (by the minimize function).
const a = tf.variable(tf.scalar(Math.random()));
const b = tf.variable(tf.scalar(Math.random()));
const c = tf.variable(tf.scalar(Math.random()));
const d = tf.variable(tf.scalar(Math.random()));
const e = tf.variable(tf.scalar(Math.random()));
const f = tf.variable(tf.scalar(Math.random()));
const g = tf.variable(tf.scalar(Math.random()));

const learningRate = 0.3;
// Optimizer used for training
const optimizer = tf.train.sgd(learningRate);

// Predict y = f(x)
function predict(x) {
  return tf.tidy(() => {
    return a.mul(x.pow(tf.scalar(6)))
      .add(b.mul(x.pow(tf.scalar(5))))
      .add(c.mul(x.pow(tf.scalar(4))))
      .add(d.mul(x.pow(tf.scalar(3))))
      .add(e.mul(x.square()))
      .add(f.mul(x))
      .add(g);
  });
}

// Compare predictions to actual data
function loss(preds, data) {
  const error = preds.sub(data).square().mean();
  return error;
}

// Training the model, the function automatically
// chances the variables used in the predict function.
function train(xs, ys) {
    optimizer.minimize(() => {
      // Feed the examples into the model
      const pred = predict(xs);
      return loss(pred, ys);
    });

}
