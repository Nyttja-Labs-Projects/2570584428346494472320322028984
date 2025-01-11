# Use the base image
FROM mcr.microsoft.com/devcontainers/typescript-node

# Install Tini
ENV TINI_VERSION v0.19.0
ADD https://github.com/krallin/tini/releases/download/${TINI_VERSION}/tini /tini
RUN chmod +x /tini

# Install zrok
RUN curl -sSLfo /zrok-install.bash https://get.openziti.io/install.bash && \
    sudo bash /zrok-install.bash zrok && \
    rm /zrok-install.bash
    
# Copy your entrypoint script into the container
COPY ../entrypoint.sh /usr/local/bin/entrypoint.sh
RUN chmod +x /usr/local/bin/entrypoint.sh

EXPOSE 80

# Set Tini as the entrypoint to handle signal forwarding and process reaping
ENTRYPOINT ["/tini", "-s", "--", "/usr/local/bin/entrypoint.sh"]

# (Optional) Define a default command if needed
CMD []