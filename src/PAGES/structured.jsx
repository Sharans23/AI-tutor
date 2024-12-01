import React from 'react'

const structured = () => {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Introduction to AI</h2>
      <p>
        Artificial Intelligence (AI) is a branch of computer science that aims
        to create intelligent machines that can perform tasks that typically
        require human intelligence.
      </p>
      <h3 className="text-xl font-semibold">Key Concepts:</h3>
      <ul className="list-disc list-inside">
        <li>Machine Learning</li>
        <li>Neural Networks</li>
        <li>Deep Learning</li>
        <li>Natural Language Processing</li>
      </ul>
      <p>
        As you progress through this structured learning path, we'll dive deeper
        into each of these concepts.
      </p>
    </div>
  );
}

export default structured